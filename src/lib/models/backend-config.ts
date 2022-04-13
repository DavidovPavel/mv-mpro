export interface MprPermissions {
  permissions: string[];
}

export interface BackendConfig extends MprPermissions {
  maxUiPacketSize: number;
  maxBackPacketSize: number;
}
