const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = (onRoute = () => {}) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    console.log(e.detail);
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
    }
    onRoute();
  });
};

export const push = (nextUrl) => {
  // 커스텀 이벤트 정의
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};
