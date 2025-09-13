declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;

type RemoteDef = { url: string; scope: string; module: string };

export async function loadRemoteEntry(url: string, scope: string): Promise<void> {
  // if container already exists, do nothing
  if ((window as any)[scope]) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });
}

export async function loadRemoteModule({ url, scope, module }: RemoteDef) {
  await loadRemoteEntry(url, scope);

  const container = (window as any)[scope];
  if (!container) throw new Error(`Container ${scope} not found on window after loading ${url}`);

  // init sharing
  await __webpack_init_sharing__('default');
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(module);
  const Module = factory();
  return Module;
}
