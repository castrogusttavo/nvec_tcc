-- Preencher a tabela de países
insert into tb_pais (nm_pais) values
	('Brasil'),
       ('Estados Unidos');

-- Preencher a tabela de estados/UF
insert into tb_uf (nm_uf, id_pais) values
	('São Paulo', 1),
       ('California', 2);


-- Preencher a tabela de cidades
insert into tb_cidade (nm_cidade, id_uf) values
	('São Paulo', 1),
       ('Los Angeles', 2);

-- Preencher a tabela de bairros
insert into tb_bairro (nm_bairro, id_cidade) values
	('Centro', 1),
       ('Downtown', 2);

-- Preencher a tabela de endereços
INSERT INTO tb_endereco (id_bairro) VALUES
       (1), 
       (2);

-- Preencher a tabela de usuários
INSERT INTO tb_usuario (nm_usuario, senha_usuario, email_usuario, id_assinatura) VALUES
       ('Gusttavo Castro', 'senha123', 'castro@gmail.com', 1),
       ('Jennifer Gama', '1234', 'gama@gmail.com', 2);

-- Preencher a tabela de comunidades
insert into tb_comunidade (nm_comunidade, sb_comunidade, id_categoria) values
       ('Comunidade de Tecnologia', 'Discussão sobre tecnologias emergentes', 9),
       ('Comunidade de Literatura', 'Discussão sobre livros e literatura', 13);

-- Preencher a tabela de listas
insert into tb_lista (nm_lista, dt_criacao, ds_lista, rd_lista, vl_gasto, id_categoria, id_usuario) values
	('Compras de Supermercado', '2024-05-01', 'Lista de compras para o mês', 100.00, 80.00, 17, 1),
       ('Materiais de Escritório', '2024-05-02', 'Lista de materiais para o escritório', 50.00, 45.00, 14, 2);


-- Preencher a tabela de itens
insert into tb_item (nm_item, vl_uni, qtde_item, id_status, id_medida, id_lista) values
	('Maça', 20.00, 2, 1, 1, 1),
       ('Feijão', 5.00, 3, 2, 2, 1);

-- Preencher a tabela de despesas
insert into tb_despesas (vl_despesa, dt_despesa, ds_despesa, id_usuario) values
	(100.00, '2024-05-01', 'Despesas de supermercado', 1),
       (50.00, '2024-05-02', 'Despesas de escritório', 2);

-- Preencher a tabela de comunidade-lista
insert into tb_comunidade_lista (id_comunidade, id_lista) values
	(1, 1),
       (2, 2);

-- Preencher a tabela de comunidade-usuário
insert into tb_comunidade_usuario (id_comunidade, id_usuario) values
	(1, 1),
       (2, 2);

-- Preencher a tabela de endereço-usuário
insert into tb_endereco_usuario (id_endereco, id_usuario) values
	(1, 1),
       (2, 2);

-- Preencher a tabela de endereço-comunidade
insert into tb_endereco_comunidade (id_endereco, id_comunidade) values
	(1, 1),
       (2, 2);

-- Preencher a tabela de endereço-lista
insert into tb_endereco_lista (id_endereco, id_lista) values
	(1, 1),
       (2, 2);
