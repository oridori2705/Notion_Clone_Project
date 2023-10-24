import { request } from "../../../utils.js";
import CommandList from "./CommandList.js";
import DocumentLinkList from "./DocumentLinkList.js";

export default function ContentInnerModal({ $target, selectionStart, option }) {
  const $contentInnerModal = document.createElement("div");
  $contentInnerModal.className = "content-inner-modal";
  $contentInnerModal.contentEditable = false;
  $contentInnerModal.style.left = `${selectionStart - 30}px`;

  $target.appendChild($contentInnerModal);

  this.close = () => {
    $contentInnerModal.remove();
  };

  if (option === "command") {
    return new CommandList({
      $parent: $target,
      $target: $contentInnerModal,
      onClose: () => {
        const $textNode = $target.childNodes[0];
        if ($textNode && $textNode.nodeType === Node.TEXT_NODE) {
          const $text = $textNode.nodeValue;
          const extractedText = $text.slice(-6);
          const newText = $text.slice(0, -extractedText.length);
          $textNode.nodeValue = newText;
        }

        this.close();
      },
    });
  } else if (option === "link") {
    const $documentLinkList = new DocumentLinkList({
      $target: $contentInnerModal,
      initialState: {
        documentLinks: [],
      },
      onClose: () => {
        this.close();
      },
    });

    if (!$documentLinkList) {
      return $documentLinkList;
    } else {
      const fetchDocumentLinks = async () => {
        const documents = await request("");
        const documentLinks = documents.map(({ id, title, documents }) => ({
          id,
          title,
          documents: documents.map(({ id, title, documents }) => ({
            id,
            title,
            documents: documents.map(({ id }) => ({ parentId: id })),
          })),
        }));
        $documentLinkList.setState({ documentLinks });
      };

      fetchDocumentLinks();
    }
  }

  return $contentInnerModal;
}
