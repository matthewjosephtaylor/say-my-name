import { SmnConfig } from "runtime/SmnConfig";

export type SmnRuntime = {
  config: SmnConfig;
};

export function createSmnRuntime(config: SmnConfig): SmnRuntime {
  return {
    config: config,
  };
}
