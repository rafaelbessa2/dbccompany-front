import React, { Fragment, useEffect, useState } from "react";

import { RootState } from "../../store/ducks";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  FormGroup,
  Nav,
  NavItem,
  TabContent,
  Table,
  TabPane,
  NavLink,
} from "reactstrap";

import Actions from "../../store/ducks/documentoLote";
import translate from "../../i18n";
import { fileToBase64 } from "../../utils";

interface Props {
  documentoLote: {
    registros?: {
      documentosLote: [
        {
          nomeArquivo: string;
          tamanhoArquivo: number;
        }
      ];
      documentosProcessados: [
        {
          nomeArquivo: string;
          tamanhoArquivo: number;
        }
      ];
      documento?: {
        nomeArquivo: string;
        arquivo: string;
      };
    };
    error?: string;
    loading: boolean;
  };
  documentoLoteAtualRequest: Function;
  documentoLoteRequest: Function;
  documentoLoteInserirRequest: Function;
}

interface IDocumento {
  arquivoBase64: string;
  nomeArquivo?: string;
}
const DocumentoLote: React.FC<Props> = ({
  documentoLoteAtualRequest,
  documentoLoteRequest,
  documentoLoteInserirRequest,
  documentoLote,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    documentoLoteAtualRequest!();
  }, [documentoLoteAtualRequest]);

  function handleDownloadArquivo(
    event: any,
    nomeArquivo: string,
    tipo: string
  ) {
    event.preventDefault();

    documentoLoteRequest(nomeArquivo, tipo);
  }

  useEffect(() => {
    if (documentoLote.registros?.documento?.arquivo !== undefined) {
      const linkSource = `data:application/dat;base64,${documentoLote.registros?.documento.arquivo}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = documentoLote.registros?.documento?.nomeArquivo;
      downloadLink.click();
    }
  }, [documentoLote.registros?.documento]);

  function validarTipoArquivo(tipo: string): boolean {
    switch (tipo) {
      case "application/dat":
        return true;
      default:
        return false;
    }
  }

  async function handleFile(event: any) {
    const file = event.target.files[0];

    if (file.name.endsWith(".dat")) {
      const documento = {
        nomeArquivo: file.name,
        arquivoBase64: ((await fileToBase64(file)) as string).split(
          "base64,"
        )[1],
      } as IDocumento;
      documentoLoteInserirRequest(documento);
      toggle("1");
    } else {
      alert(translate.t("app.mensagem.validacao.anexoExtensao"));
    }
  }
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("1");
            }}
          >
            {translate.t("app.tela.documentoLote.label.documentosLote")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("2");
            }}
          >
            {translate.t("app.tela.documentoLote.label.documentosProcessandos")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              toggle("3");
            }}
          >
            {translate.t("app.tela.documentoLote.label.inserirDocumentoLote")}
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {documentoLote.loading && <Fragment>Processando...</Fragment>}
          {translate.t("app.tela.documentoLote.titulo")}
          <Table style={{ width: "80%" }}>
            <thead>
              <tr>
                <th>{translate.t("app.tela.documentoLote.label.nome")}</th>
                <th>{translate.t("app.tela.documentoLote.label.tamanho")}</th>
                <th>{translate.t("app.tela.documentoLote.label.arquivo")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documentoLote.registros?.documentosLote?.map(
                (documento, index) => {
                  const tamanhoEmKB = documento?.tamanhoArquivo / 1000;
                  return (
                    <tr key={index}>
                      <td>{documento.nomeArquivo}</td>
                      <td>{`${tamanhoEmKB} kb`}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(event) => {
                            handleDownloadArquivo(
                              event,
                              documento.nomeArquivo,
                              "lote"
                            );
                          }}
                          className="btn btn--primary btn-sm px-2 py-1 mt-1"
                        >
                          {translate.t("app.botao.baixar")}
                        </a>
                      </td>
                      <td></td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </TabPane>
        <TabPane tabId="2">
          {documentoLote.loading && <Fragment>Processando...</Fragment>}
          {translate.t("app.tela.documentoLote.titulo")}
          <Table style={{ width: "80%" }}>
            <thead>
              <tr>
                <th>{translate.t("app.tela.documentoLote.label.nome")}</th>
                <th>{translate.t("app.tela.documentoLote.label.tamanho")}</th>
                <th>{translate.t("app.tela.documentoLote.label.arquivo")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documentoLote.registros?.documentosProcessados?.map(
                (documento, index) => {
                  const tamanhoEmKB = documento?.tamanhoArquivo / 1000;
                  return (
                    <tr key={index}>
                      <td>{documento.nomeArquivo}</td>
                      <td>{`${tamanhoEmKB} kb`}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(event) => {
                            handleDownloadArquivo(
                              event,
                              documento.nomeArquivo,
                              "processado"
                            );
                          }}
                          className="btn btn--primary btn-sm px-2 py-1 mt-1"
                        >
                          {translate.t("app.botao.baixar")}
                        </a>
                      </td>
                      <td></td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </TabPane>
        <TabPane tabId="3">
          {documentoLote.loading && <Fragment>Processando...</Fragment>}
          {translate.t("app.tela.documentoLote.titulo")}
          <FormGroup>
            <input type="file" onChange={handleFile} />
          </FormGroup>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  documentoLote: state.documentoLote,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentoLote);
