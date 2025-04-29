export const shouldHideFooter = (pathname) => {
  const noFooterPaths = ['/login', '/register', '/admin/login'];
  return noFooterPaths.includes(pathname);
};