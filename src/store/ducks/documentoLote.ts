import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  documentoLoteAtualRequest: [],
  documentoLoteSuccess: ["registros"],
  documentoLoteFailure: ["error"],
  documentoLoteRequest: ["nomeArquivo", "tipo"],
  documentoLoteInserirRequest: ["body"],
});

export const DocumentoLoteTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  error: "",
  registros: {},
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DOCUMENTO_LOTE_ATUAL_REQUEST]: (state) => state.merge({}),
  [Types.DOCUMENTO_LOTE_INSERIR_REQUEST]: (state) => state.merge({}),

  [Types.DOCUMENTO_LOTE_REQUEST]: (state) => state.merge({ loading: true }),

  [Types.DOCUMENTO_LOTE_SUCCESS]: (state, { registros }) =>
    state.merge({
      error: "",
      loading: false,
      registros: { ...state.registros, ...registros },
    }),

  [Types.DOCUMENTO_LOTE_FAILURE]: (state, { error }) =>
    state.merge({ error, loading: false }),
});
