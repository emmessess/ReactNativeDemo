import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  startService(): void;
  stopService(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocationTracking',
);