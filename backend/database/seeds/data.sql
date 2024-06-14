-- Preencher a tabela de usuários
INSERT INTO tb_usuario (nm_usuario, senha_usuario, email_usuario, id_assinatura) VALUES
    ('Gusttavo Castro', '$2b$10$MhOpRFnAGFHNAVZS523kp.IULBZ32FBV/F6kofdxMQ3xE2Qn9rsHS', 'castro@gmail.com', 1),
    ('Jennifer Gama', '$2b$10$MhOpRFnAGFHNAVZS523kp.IULBZ32FBV/F6kofdxMQ3xE2Qn9rsHS', 'gama@gmail.com', 2);

-- Preencher a tabela de comunidades
INSERT INTO tb_comunidade (nm_comunidade, sb_comunidade, end_comunidade, dt_criacao, id_categoria, id_criador) VALUES
    ('Comunidade de Tecnologia', 'Discussão sobre tecnologias emergentes', 'Endereco Tecnologico', '2024-01-01', 9, 1),
    ('Comunidade de Literatura', 'Discussão sobre livros e literatura', 'Endereco Literario', '2024-01-01', 13, 2);

-- Preencher a tabela de listas
INSERT INTO tb_lista (nm_lista, dt_criacao, ds_lista, rd_lista, end_lista, id_categoria, id_usuario) VALUES
    ('Compras de Supermercado', '2024-05-01', 'Lista de compras para o mês', 100.00, 'Endereco Supermercado', 17, 1),
    ('Materiais de Escritório', '2024-06-02', 'Lista de materiais para o escritório', 50.00, 'Endereco Escritorio', 14, 1),
    ('Lista de Eletrônicos', '2024-06-03', 'Lista de compras de eletrônicos', 500.00, 'Endereco Eletrônicos', 9, 1),
    ('Lista de Roupas', '2024-05-04', 'Lista de compras de roupas', 200.00, 'Endereco Roupas', 16, 1),
    ('Lista de Limpeza', '2024-05-05', 'Lista de compras de produtos de limpeza', 80.00, 'Endereco Limpeza', 15, 1);

-- Preencher a tabela de itens
INSERT INTO tb_item (nm_item, vl_uni, qtde_item, qtde_medida_item, id_status, id_medida, id_lista) VALUES
    ('Maçã', 20.00, 2, 1, 1, 1, 1),
    ('Feijão', 5.00, 3, 1, 2, 2, 1),
    ('TV', 1000.00, 1, 1, 2, 1, 3),
    ('Camisa', 50.00, 2, 1, 2, 1, 4),
    ('Sabão em Pó', 10.00, 2, 1, 2, 1, 5);

-- Preencher a tabela de listas fixas
INSERT INTO tb_lista_fixa (id_comunidade) VALUES
    (1),
    (2);

-- Preencher a tabela de itens fixos
INSERT INTO tb_item_fixo (id_lista_fixa, nm_item, qtde_medida, qtde_item, id_medida) VALUES
    (1, 'Item Fixo 1', 2, 1, 1),
    (2, 'Item Fixo 2', 3, 2, 2);

-- Preencher a tabela de listas variáveis
INSERT INTO tb_lista_variavel (id_lista_fixa, id_usuario, end_lista) VALUES
    (1, 1, 'Endereco 1'),
    (2, 1, 'Endereco 2');

-- Preencher a tabela de itens variáveis
INSERT INTO tb_item_variavel (vl_uni, id_lista_variavel, id_item_fixo) VALUES
    (100.00, 1, 1),
    (50.00, 2, 2);

-- Preencher a tabela de comunidade-usuário
INSERT INTO tb_comunidade_usuario (id_comunidade, id_usuario) VALUES
    (1, 1),
    (2, 2);
