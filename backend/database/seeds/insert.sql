insert into tb_pais (nm_Pais) values 
('Brasil');

insert into tb_uf (nm_Uf, id_Pais) values
('Acre', 1),
('Alagoas', 1),
('Amapá', 1),
('Amazonas', 1),
('Bahia', 1),
('Ceará', 1),
('Distrito Federal', 1),
('Espírito Santo', 1),
('Goiás', 1),
('Maranhão', 1),
('Mato Grosso', 1),
('Mato Grosso do Sul', 1),
('Minas Gerais', 1),
('Pará', 1),
('Paraíba', 1),
('Paraná', 1),
('Pernambuco', 1),
('Piauí', 1),
('Rio de Janeiro', 1),
('Rio Grande do Norte', 1),
('Rio Grande do Sul', 1),
('Rondônia', 1),
('Roraima', 1),
('Santa Catarina', 1),
('São Paulo', 1),
('Sergipe', 1),
('Tocantins', 1);

insert into tb_categoria (ds_categoria)
values
('Eletrônicos'),
('Roupas'),
('Livros'),
('Supermercado'),
('Produtos de Limpeza'),
('Casa e Decoração'),
('Brinquedos'),
('Ferramentas'),
('Artigos Esportivos'),
('Material de Escritório'),
('Cosméticos'),
('Acessórios para Veículos'),
('Jogos e Consoles'),
('Instrumentos Musicais'),
('Artigos para Jardim'),
('Papelaria'),
('Perfumes'),
('Calçados'),
('Artigos'),
('Animais de estimação');

insert into tb_status (estado_status, ds_status) values
(true, 'Obtido'),
(false, 'Não obtido');

insert into tb_assinatura(ds_assinatura) values
('Baixo'),
('Médio'),
('Alto');