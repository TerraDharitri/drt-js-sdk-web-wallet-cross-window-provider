import type { IPlainTransactionObject } from '@terradharitri/sdk-core';
import {
  WindowProviderRequestEnums,
  WindowProviderResponseEnums,
  SignMessageStatusEnum
} from '../enums';

export type ReplyWithPostMessageObjectType = {
  [WindowProviderResponseEnums.handshakeResponse]: string;
  [WindowProviderResponseEnums.loginResponse]: {
    address: string;
    signature: string;
    accessToken?: string;
    /**
     * contract address for alternate multisig login
     * */
    multisig?: string;
    /**
     * custom address for alternate login
     * */
    impersonate?: string;
  };
  [WindowProviderResponseEnums.reloginResponse]: {
    accessToken?: string;
  };
  [WindowProviderResponseEnums.disconnectResponse]: boolean;
  [WindowProviderResponseEnums.cancelResponse]: {
    address: string;
  };
  [WindowProviderResponseEnums.signTransactionsResponse]: IPlainTransactionObject[];
  [WindowProviderResponseEnums.guardTransactionsResponse]: IPlainTransactionObject[];
  [WindowProviderResponseEnums.signMessageResponse]: {
    signature?: string;
    status: SignMessageStatusEnum;
  };
  [WindowProviderResponseEnums.noneResponse]: null;
  [WindowProviderResponseEnums.resetStateResponse]: boolean;
  [WindowProviderResponseEnums.finalizeHandshakeResponse]: string;
};

export type ReplyWithPostMessagePayloadType<
  K extends keyof ReplyWithPostMessageObjectType
> = {
  data?: ReplyWithPostMessageObjectType[K];
  error?: string;
};

export type ReplyWithPostMessageType = {
  [K in keyof ReplyWithPostMessageObjectType]: {
    type: K;
    payload: ReplyWithPostMessagePayloadType<K>;
  };
}[keyof ReplyWithPostMessageObjectType];

export type ResponseTypeMap = {
  [WindowProviderRequestEnums.signTransactionsRequest]: WindowProviderResponseEnums.signTransactionsResponse;
  [WindowProviderRequestEnums.signMessageRequest]: WindowProviderResponseEnums.signMessageResponse;
  [WindowProviderRequestEnums.loginRequest]: WindowProviderResponseEnums.loginResponse;
  [WindowProviderRequestEnums.reloginRequest]: WindowProviderResponseEnums.reloginResponse;
  [WindowProviderRequestEnums.logoutRequest]: WindowProviderResponseEnums.disconnectResponse;
  [WindowProviderRequestEnums.guardTransactionsRequest]: WindowProviderResponseEnums.guardTransactionsResponse;
  [WindowProviderRequestEnums.cancelAction]: WindowProviderResponseEnums.cancelResponse;
  [WindowProviderRequestEnums.finalizeHandshakeRequest]: WindowProviderResponseEnums.finalizeHandshakeResponse;
  [WindowProviderRequestEnums.finalizeResetStateRequest]: WindowProviderResponseEnums.resetStateResponse;
};

export type RequestPayloadType = {
  [WindowProviderRequestEnums.loginRequest]: {
    token: string | undefined;
  };
  [WindowProviderRequestEnums.reloginRequest]: {
    token: string | undefined;
  };
  [WindowProviderRequestEnums.logoutRequest]: undefined;
  [WindowProviderRequestEnums.signTransactionsRequest]: IPlainTransactionObject[];
  [WindowProviderRequestEnums.guardTransactionsRequest]: IPlainTransactionObject[];
  [WindowProviderRequestEnums.signMessageRequest]: {
    message: string;
  };
  [WindowProviderRequestEnums.cancelAction]: undefined;
  [WindowProviderRequestEnums.finalizeHandshakeRequest]: string;
  [WindowProviderRequestEnums.finalizeResetStateRequest]: string | undefined;
};

export type RequestMessageType = {
  [K in keyof RequestPayloadType]: {
    type: K;
    payload: RequestPayloadType[K];
  };
}[keyof RequestPayloadType];

export type ReplyWithPostMessageEventType = {
  [K in keyof ReplyWithPostMessageObjectType]: {
    type: WindowProviderResponseEnums;
    payload: ReplyWithPostMessageObjectType[K];
  };
}[keyof ReplyWithPostMessageObjectType];

export interface PostMessageParamsType<T extends WindowProviderRequestEnums> {
  type: T;
  payload: RequestPayloadType[keyof RequestPayloadType];
}

export interface PostMessageReturnType<T extends WindowProviderRequestEnums> {
  type: ResponseTypeMap[T] | WindowProviderResponseEnums.cancelResponse;
  payload: ReplyWithPostMessagePayloadType<ResponseTypeMap[T]>;
}
