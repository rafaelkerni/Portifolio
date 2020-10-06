export const formataMoedaCom = (valor) => !valor ?  "".toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

export const formataMoedaSem = (valor) => !valor ?  "".toLocaleString('pt-br', {minimumFractionDigits: 2}) : valor.toLocaleString('pt-br', {minimumFractionDigits: 2});

export const formataMoedaBanco = (valor) => !valor ?  "".toLocaleString('en-us', {minimumFractionDigits: 2}) : valor.toLocaleString('pt-br', {minimumFractionDigits: 2});