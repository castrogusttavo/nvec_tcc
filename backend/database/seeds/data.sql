-- Preencher a tabela de usuários
INSERT INTO tb_usuario (nm_usuario, senha_usuario, email_usuario, id_assinatura) VALUES
    ('Gusttavo Castro', 'senha123', 'castro@gmail.com', 1),
    ('Jennifer Gama', '1234', 'gama@gmail.com', 2);

-- Preencher a tabela de comunidades
INSERT INTO tb_comunidade (nm_comunidade, sb_comunidade, end_comunidade, id_categoria) VALUES
    ('Comunidade de Tecnologia', 'Discussão sobre tecnologias emergentes', 'Endereco Tecnologico', 9),
    ('Comunidade de Literatura', 'Discussão sobre livros e literatura', 'Endereco Literario', 13);

-- Preencher a tabela de listas
INSERT INTO tb_lista (nm_lista, dt_criacao, ds_lista, rd_lista, end_lista, id_categoria, id_usuario) VALUES
    ('Compras de Supermercado', '2024-05-01', 'Lista de compras para o mês', 100.00, 'Endereco Supermercado', 17, 1),
    ('Materiais de Escritório', '2024-05-02', 'Lista de materiais para o escritório', 50.00, 'Endereco Escritorio', 14, 1);

-- Preencher a tabela de itens
INSERT INTO tb_item (nm_item, vl_uni, qtde_item, qtde_medida_item, id_status, id_medida, id_lista) VALUES
    ('Maçã', 20.00, 2, 1, 1, 1, 1),
    ('Feijão', 5.00, 3, 1, 2, 2, 1);
    
-- Preencher a tabela de listas fixas
INSERT INTO tb_lista_fixa (id_item, qtde_item, id_medida, id_usuario) VALUES
    ('1', 2, 1, 1),
    ('2', 3, 2, 1);

-- Preencher a tabela de despesas
INSERT INTO tb_lista_variavel (id_lista_fixa, vl_uni, id_usuario) VALUES
    (1, 100.00, 1),
    (2, 50.00, 1);

-- Preencher a tabela de comunidade-lista
INSERT INTO tb_comunidade_lista (id_comunidade, id_lista_fixa) VALUES
    (1, 1),
    (2, 2);

-- Preencher a tabela de comunidade-usuário
INSERT INTO tb_comunidade_usuario (id_comunidade, id_usuario) VALUES
    (1, 1),
    (2, 2);
