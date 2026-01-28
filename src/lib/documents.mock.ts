import type { Doc } from "./content.mock";

export const documentsBySection = {
  resolucoes: [
    {
      title: "Regimento do Comitê Anti-Imperialista Abreu e Lima",
      description: "Normas de funcionamento e organização do Comitê.",
      ipfsUrl: "ipfs://CID_EXEMPLO/Regimento-CAL.pdf",
      type: "PDF",
      year: "2025",
    },
    {
      title: "Resoluções do II Encontro Anti-Imperialista",
      description: "Deliberações políticas aprovadas no II Encontro.",
      ipfsUrl: "ipfs://CID_EXEMPLO/Resolucao-II-Encontro.pdf",
      type: "DOCX",
      year: "2024",
    },
  ],

  encontros: [
    {
      title: "Relatório do II Encontro Anti-Imperialista",
      description: "Síntese política e organizativa do encontro.",
      ipfsUrl: "ipfs://CID_EXEMPLO/Relatorio-II-Encontro.doc",
      type: "DOC",
      year: "2024",
    },
  ],

  publicacoes: [
    {
      title: "Jornal Labareda — Edição 01",
      description: "Jornal político do Comitê Anti-Imperialista.",
      ipfsUrl: "ipfs://CID_EXEMPLO/Labareda-01.pdf",
      type: "PDF",
      year: "2023",
    },
  ],
};
