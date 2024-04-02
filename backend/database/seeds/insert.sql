use db_nvec;

insert into tb_pais (nm_pais) values 
('Brasil');

insert into tb_uf (nm_uf, id_pais) values
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

insert into tb_status (ds_status, estado_status) values
('Obtido', true),
('Não obtido', false);

insert into tb_assinatura(ds_assinatura) values
('Baixo'),
('Médio'),
('Alto');

insert into tb_usuario(nm_usuario, senha_usuario, email_usuario, id_assinatura) values 
('Álvaro Oliveira','çenhaForte123','alvarooliveira@email.com',2), 
('Juliana Barroso','julianaÇenha','julianabarroso@email.com',3);

insert into tb_comunidade (nm_comunidade, id_categoria) values
('Papelarias no Precinho', 16),
('Mercados em conta', 4);

insert into tb_lista(nm_lista, dt_criacao, ds_lista, id_categoria, id_usuario) values
('Volta às aulas','2024-01-12','Materiais de papelaria baratos',16,1),
('Compras do mês','2023-12-23','Mercados com preços acessíveis',4,2);

insert into tb_item(nm_item, vl_uni, id_status, id_lista) values 
('Caderno de Desenho',11.23,1,1),
('Compasso',3.45,2,1),
('Arroz 5 quilos',24.33,1,2),
('Vinagre',7.98,1,2);

insert into tb_cidade(nm_cidade, id_uf) values
('Santos',25),
('São Vicente',25);

insert into tb_bairro(nm_bairro, id_cidade) values
('Embaré',1),
('Rio Branco',2);

insert into tb_endereco(id_bairro) values
(1),
(2);

insert into tb_renda(ds_renda, vl_renda, dt_renda, id_usuario) values 
('Salário',2170,'2024-03-15',1),
('Trabalho como freelancer',290,'2024-02-23',2);

insert into tb_despesa_fixa(vl_despesa_fixa, ds_despesa_fixa, id_usuario) values
(980,'Aluguel',1),
(167,'Conta de energia elétrica',1),
(244.56,'Conta de Luz',2),
(670,'Aluguel',2);

insert into tb_despesa_variavel(vl_despesa_var,ds_despesa_var,id_usuario) values
(34.18,'Cinema e Burger King',1),
(76,'Show da Taylor Swift',2);