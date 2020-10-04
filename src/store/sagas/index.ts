import { all, takeLatest } from "redux-saga/effects";

import { DocumentoLoteTypes } from "../ducks/documentoLote";
import {
  documentoLoteRequest,
  documentoLoteAtualRequest,
  documentoLoteInserirRequest,
} from "./documentoLote";

export default function* rootSaga() {
  yield all([
    takeLatest(DocumentoLoteTypes.DOCUMENTO_LOTE_REQUEST, documentoLoteRequest),
    takeLatest(
      DocumentoLoteTypes.DOCUMENTO_LOTE_ATUAL_REQUEST,
      documentoLoteAtualRequest
    ),
    takeLatest(
      DocumentoLoteTypes.DOCUMENTO_LOTE_INSERIR_REQUEST,
      documentoLoteInserirRequest
    ),
  ]);
}
