type Conexao = { origem: string; destino: string; ip: string; porta: number };
type Ouvinte = { origem: string; ip: string; porta: number };

export type Servico = { nome: string; conexoes: Conexao[]; ouvintes: Ouvinte[] };