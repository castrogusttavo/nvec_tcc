-- Preencher a tabela de países
INSERT INTO tb_pais (nm_pais) VALUES ('Brasil'), ('Estados Unidos'), ('Canadá'), ('México'), ('Argentina'), ('Chile');

-- Preencher a tabela de estados/UF
INSERT INTO tb_uf (nm_uf, id_pais) VALUES
       ('São Paulo', 1), 
       ('Rio de Janeiro', 1), 
       ('Minas Gerais', 1), 
       ('Goiás', 1), 
       ('Espírito Santos', 1), 
       ('Nova Iorque', 2), 
       ('Califórnia', 2), 
       ('Ontário', 3), 
       ('British Columbia', 3);

-- Preencher a tabela de cidades
INSERT INTO tb_cidade (nm_cidade, id_uf) VALUES
       ('São Paulo', 1), 
       ('Rio de Janeiro', 2), 
       ('Nova Iorque', 3), 
       ('Los Angeles', 4), 
       ('Toronto', 5), 
       ('Vancouver', 6);

-- Preencher a tabela de bairros
INSERT INTO tb_bairro (nm_bairro, id_cidade) VALUES
       ('Jardins', 1), 
       ('Copacabana', 2), 
       ('Manhattan', 3), 
       ('Beverly Hills', 4), 
       ('North York', 5), 
       ('Kitsilano', 6);

-- Preencher a tabela de endereços
INSERT INTO tb_endereco (id_bairro) VALUES
       (1), (2), (3), (4), (5), (6);

-- Preencher a tabela de usuários
INSERT INTO tb_usuario (nm_usuario, senha_usuario, email_usuario, id_assinatura) VALUES
       ('Álvaro Oliveira', 'senha123', 'alvaro.oliveira@example.com', 1),
       ('Maria Silva', '1234', 'maria.silva@example.com', 2),
       ('John Doe', 'abcd', 'john.doe@example.com', 3),
       ('Jane Doe', 'pass5678', 'jane.doe@example.com', 4),
       ('Carlos Santana', 'qwerty', 'carlos.santana@example.com', 5),
       ('Sophia Smith', 'password', 'sophia.smith@example.com', 6);

-- Preencher a tabela de comunidades
INSERT INTO tb_comunidade (nm_comunidade, sb_comunidade, id_categoria) VALUES
       ('Comunidade de Automóveis', 'Discutir carros', 3),
       ('Comunidade de Casa', 'Decoração e design', 5),
       ('Comunidade de Brinquedos', 'Brinquedos e jogos', 4),
       ('Comunidade de Animais', 'Amo animais', 1),
       ('Comunidade de Artigos', 'Diversos artigos', 2),
       ('Comunidade de Calçados', 'Para os amantes de sapatos', 6);

-- Preencher a tabela de listas
INSERT INTO tb_lista (nm_lista, dt_criacao, ds_lista, id_categoria, id_usuario) VALUES
       ('Lista de Compras', '2024-04-10', 'Para a semana', 1, 1),
       ('Lista de Brinquedos', '2024-04-11', 'Para a criançada', 4, 2),
       ('Lista de Artigos', '2024-04-12', 'Para casa', 2, 3),
       ('Lista de Calçados', '2024-04-13', 'Para mim', 6, 4),
       ('Lista de Animais', '2024-04-14', 'Para meu cachorro', 1, 5),
       ('Lista de Automóveis', '2024-04-15', 'Peças novas', 3, 6);

-- Preencher a tabela de itens
INSERT INTO tb_item (nm_item, vl_uni, qt_item, id_status, id_medida, id_lista) VALUES
       ('Maçã', 3.50, 10, 1, 1, 1),
       ('Boneca', 19.90, 2, 1, 1, 2),
       ('Cadeira', 120.50, 1, 1, 5, 3),
       ('Sapato', 89.90, 1, 1, 4, 4),
       ('Ração', 20.00, 3, 1, 1, 5),
       ('Óleo para carros', 15.00, 5, 1, 1, 6);

-- Preencher a tabela de despesas
INSERT INTO tb_despesas (vl_despesa, dt_despesa, ds_despesa, id_usuario) VALUES
       (150.00, '2024-04-05', 'Compra no supermercado', 1),
       (180.00, '2024-04-06', 'Compra de brinquedos', 2),
       (250.00, '2024-04-07', 'Artigos para casa', 3),
       (300.00, '2024-04-08', 'Compra de sapatos', 4),
       (50.00, '2024-04-09', 'Ração para animais', 5),
       (75.00, '2024-04-10', 'Peças para automóveis', 6);

-- Preencher a tabela de comunidade-lista
INSERT INTO tb_comunidade_lista (id_comunidade, id_lista) VALUES
       (1, 6), 
       (2, 3), 
       (3, 2), 
       (4, 5), 
       (5, 1), 
       (6, 4);

-- Preencher a tabela de comunidade-usuário
INSERT INTO tb_comunidade_usuario (id_comunidade, id_usuario) VALUES
       (1, 1), 
       (2, 2), 
       (3, 3), 
       (4, 4), 
       (5, 5), 
       (6, 6);

-- Preencher a tabela de endereço-usuário
INSERT INTO tb_endereco_usuario (id_endereco, id_usuario) VALUES
       (1, 1), 
       (2, 2), 
       (3, 3), 
       (4, 4), 
       (5, 5), 
       (6, 6);

-- Preencher a tabela de endereço-comunidade
INSERT INTO tb_endereco_comunidade (id_endereco, id_comunidade) VALUES
       (1, 1), 
       (2, 2), 
       (3, 3), 
       (4, 4), 
       (5, 5), 
       (6, 6);

-- Preencher a tabela de endereço-lista
INSERT INTO tb_endereco_lista (id_endereco, id_lista) VALUES
       (1, 1), 
       (2, 2), 
       (3, 3), 
       (4, 4), 
       (5, 5), 
       (6, 6);
