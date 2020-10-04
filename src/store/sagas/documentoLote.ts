import { call, put } from "redux-saga/effects";

import api from "../../services/api";
import DocumentoLoteActions from "../ducks/documentoLote";

import translate from "../../i18n";

interface RequestData {
  nomeArquivo?: string;
  tipo?: string;
  body: {};
}

export function* documentoLoteAtualRequest() {
  try {
    const { data } = yield call(api.get, "/api/lista/documento/lote/v1");
    const retorno = yield call(api.get, "/api/lista/documento/processado/v1");
    yield put(
      DocumentoLoteActions.documentoLoteSuccess({
        documentosLote: data,
        documentosProcessados: retorno.data,
      })
    );
  } catch (error) {
    let message = translate.t("app.mensagem.erro");

    if (error.response && error.response.data.mensagem) {
      message = error.response.data.mensagem;
    }

    yield put(DocumentoLoteActions.documentoLoteFailure(message));
  }
}

export function* documentoLoteRequest(action: RequestData) {
  try {
    const { nomeArquivo, tipo } = action;

    const { data } = yield call(api.get, `/api/download/documento/${tipo}/v1`, {
      params: { nomeArquivo },
    });
    console.log(data);
    yield put(
      DocumentoLoteActions.documentoLoteSuccess({
        documento: data,
      })
    );
  } catch (error) {
    let message = translate.t("app.mensagem.erro");

    if (error.response && error.response.data.mensagem) {
      message = error.response.data.mensagem;
    }

    yield put(DocumentoLoteActions.documentoLoteFailure(message));
  }
}

export function* documentoLoteInserirRequest(action: RequestData) {
  try {
    const { body } = action;
    console.log(body);
    const { data } = yield call(
      api.post,
      "/api/inseri/documento/lote/v1",
      body
    );
    yield put(DocumentoLoteActions.documentoLoteSuccess());
    yield put(DocumentoLoteActions.documentoLoteAtualRequest());
  } catch (error) {
    let message = translate.t("app.mensagem.erro");

    if (error.response && error.response.data.mensagem) {
      message = error.response.data.mensagem;
    }

    yield put(DocumentoLoteActions.documentoLoteFailure(message));
  }
}
