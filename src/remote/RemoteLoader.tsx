import React, { useEffect, useState } from 'react';
import { loadRemoteModule } from './loadRemote';
import ErrorBoundary from '../components/ErrorBoundary';

type RemoteDef = { name: string; url: string; scope: string; module: string; route?: string };
const RemoteLoader: React.FC<{ remote: RemoteDef; fallback?: React.ReactNode }> = ({ remote, fallback }) => {
  const [LoadedComp, setLoadedComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;

    loadRemoteModule({ url: remote.url, scope: remote.scope, module: remote.module })
      .then((mod) => {
        // many remotes export default component, others might export named — handle both
        const comp = (mod && (mod.default || mod)) as React.ComponentType;
        if (mounted) setLoadedComp(() => comp);
      })
      .catch((err) => {
        console.error(`Failed to load remote ${remote.name}`, err);
        if (mounted) {
          // fallback component
          setLoadedComp(() => () => <>{fallback || <div>Module unavailable</div>}</>);
        }
      });

    return () => { mounted = false; };
  }, [remote]);

  if (!LoadedComp) return <div>Loading remote...</div>;
  const C = LoadedComp as React.ComponentType;
  return (
    <ErrorBoundary fallback={fallback}>
      <C />
    </ErrorBoundary>
  );
};

export default RemoteLoader;
