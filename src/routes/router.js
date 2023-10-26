import { ROUTE_CHANGE_EVENT, ROUTE_POPPED_EVENT } from "../constants/event.js";

export const initRouter = (onRoute, onPopped = null) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (event) => {
    const { nextUrl, state } = event.detail;

    if (nextUrl) {
      history.pushState(state ? state : null, null, nextUrl);
      onRoute();
    }
  });

  if (onPopped === null) return;

  window.addEventListener(ROUTE_POPPED_EVENT, () => {
    onPopped();
  });
};

export const navigate = (nextUrl, state = null) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
        state,
      },
    })
  );
};
