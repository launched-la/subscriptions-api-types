import type * as SnacktimeLib from '@launchedla/snacktime'

declare namespace Snacktime {
  /**
   * Required headers:
   *   - 'X-Recharge-Customer-Hash'
   *   - 'X-Shopify-Domain'
   */
  interface RecordActionRequestBody {
    subscriptionId: number
    action: DistributiveOmit<SnacktimeLib.Types.Action, 'bundleChargeTime' | 'createdAt' | 'didExport' | 'storeCustomer'>
  }
}

/**
 * Omit the given properties from each type in the given union
 * https://stackoverflow.com/a/57103940
 */
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
