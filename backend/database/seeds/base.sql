use db_nvec;
insert into tb_categoria(ds_categoria) values
        ('Alimentos'),
        ('Animais'),
		('Artigos'),
		('Automóveis'),
        ('Brinquedos'),
        ('Casa e Decoração'),
        ('Calçados'),
        ('Cosméticos'),
        ('Eletrônicos'),
        ('Esporte'),
        ('Ferramentas'),
        ('Jogos'),
        ('Literatura'),
        ('Papelaria'),
        ('Limpeza'),
        ('Roupas'),
        ('Supermercado'),
        ('Outros');
        
insert into tb_assinatura(ds_assinatura) values
('Bronze'),
('Prata'),
('Ouro');

insert into tb_medida_item(ds_medida) values
('kg'),
('g'),
('L'),
('mL'),
('m');

insert into tb_status (ds_status, ic_status) 
values ('Pendente', 0), ('Comprado', 1);
