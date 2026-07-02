export const formatDate = (value: string) => new Date(value).toLocaleDateString('pt-BR');
export const toInputDate = (value: string) => value.slice(0, 10);
