export interface CreateProductDTO {
  nome: string;
  preco: number;
  lote: string;
  validade: string;
  quantidade: number;
  localizacao: string;
  fornecedor: string;
}

export interface PickLoteDTO {
  lote: string;
}

export interface PickIdDTO {
  id: number;
}
