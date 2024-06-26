drop database if exists db_nvec;
create database if not exists db_nvec default character set utf8;
use db_nvec;

create table if not exists tb_status (
	id_status int auto_increment not null,
    ds_status enum('Pendente', 'Comprado') not null,
    ic_status tinyint not null,
    primary key (id_status)
) default character set utf8;

create table if not exists tb_categoria (
	id_categoria int not null auto_increment,
    ds_categoria enum(
		'Alimentos',
		'Animais',
		'Artigos',
		'Automóveis',
        'Brinquedos',
        'Casa e Decoração',
        'Calçados',
        'Cosméticos',
        'Eletrônicos',
        'Esporte',
        'Ferramentas',
        'Jogos',
        'Literatura',
        'Papelaria',
        'Limpeza',
        'Roupas',
        'Supermercado' ,
        'Outros'
	) not null,
    primary key (id_categoria)
) default character set utf8;

create table if not exists tb_assinatura (
	id_assinatura int auto_increment not null,
    ds_assinatura enum('Bronze','Prata','Ouro') not null,
    primary key (id_assinatura)
) default character set utf8;

create table if not exists tb_medida_item(
	id_medida int auto_increment not null,
	ds_medida enum('kg', 'g', 'L', 'mL', 'm', 'cm', 'unid.') not null,
    primary key (id_medida)
) default character set utf8;
        
create table if not exists tb_usuario (
	id_usuario int not null auto_increment,
    nm_usuario varchar(50) not null,
    senha_usuario varchar(60) not null,
    email_usuario varchar(200) unique not null,
    id_assinatura int not null default 1,
    primary key (id_usuario),
    index assinatura(id_assinatura asc) visible,
    constraint assinatura
		foreign key (id_assinatura)
		references tb_assinatura(id_assinatura)) default character set utf8;

create table if not exists tb_comunidade (
	id_comunidade int auto_increment not null,
    nm_comunidade varchar(30),
    sb_comunidade varchar(100) not null,
    end_comunidade varchar(50) not null,
    dt_criacao date,
    id_categoria int not null,
    id_criador int not null,
    primary key (id_comunidade),
    index categoria_comunidade (id_categoria asc) visible,
    constraint categoria_comunidade
		foreign key (id_categoria) 
        references tb_categoria(id_categoria),
	constraint id_criador
		foreign key (id_criador) 
        references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_lista_fixa(
	id_lista_fixa int not null auto_increment unique,
	constraint id_lista_fixa
		foreign key(id_lista_fixa)
        references tb_comunidade(id_comunidade)
) default character set utf8;

create table if not exists tb_item_fixo(
    id_item_fixo int auto_increment not null,
	id_lista_fixa int not null,
    nm_item varchar(50),
    qtde_medida int,
    qtde_item int,
    id_medida int,
    primary key (id_item_fixo),
    constraint medida
		foreign key (id_medida)
        references tb_medida_item(id_medida),
	constraint id_item_fixo
		foreign key(id_lista_fixa)
        references tb_lista_fixa(id_lista_fixa)
) default character set utf8;

create table if not exists tb_lista_variavel(
	id_lista_variavel int not null auto_increment,
	id_lista_fixa int not null,
    id_usuario int not null,
    end_lista varchar(50),
    primary key(id_lista_variavel),
    constraint lista_fixa
		foreign key(id_lista_fixa)
        references tb_lista_fixa(id_lista_fixa),
	constraint usuario_lista_variavel
		foreign key(id_usuario)
        references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_item_variavel(
	id_item_variavel int not null auto_increment,
    vl_uni decimal(10,2) default 0,
	id_lista_variavel int not null,
    id_item_fixo int not null,
    primary key(id_item_variavel),
	constraint id_lista_variavel_fk
		foreign key(id_lista_variavel)
        references tb_lista_variavel(id_lista_variavel),
	constraint id_item_fixo_comunidade
		foreign key(id_item_fixo)
        references tb_item_fixo(id_item_fixo)
)default character set utf8;

create table if not exists tb_lista (
	id_lista int auto_increment not null,
    nm_lista varchar(50),
    dt_criacao date,
    ds_lista varchar(140),
    rd_lista decimal(10,2),
    end_lista varchar(50) not null,
    id_categoria int not null,
    id_usuario int not null,
    primary key (id_lista),
    index usuario_li(id_usuario asc) visible,
    constraint usuario_li
		foreign key (id_usuario)
        references tb_usuario(id_usuario),
	index categoria_li (id_categoria asc) visible,
	constraint categoria_li
		foreign key (id_categoria)
        references tb_categoria(id_categoria)
) default character set utf8;

CREATE TABLE IF NOT EXISTS tb_comunidade_usuario (
    id_comunidade int not null,
    id_usuario int not null,
    primary key (id_comunidade, id_usuario),
    index comunidade_usuario (id_comunidade asc) visible,
    constraint fk_comunidade_usuario
        foreign key (id_comunidade)
        references tb_comunidade(id_comunidade),
    index usuario (id_usuario asc) visible,
    constraint fk_usuario
        foreign key (id_usuario)
        references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_item (
	id_item int not null auto_increment,
    nm_item varchar(50) not null,
	vl_uni decimal(10,2) not null,
	qtde_item int not null,
	qtde_medida_item int not null,
    id_status int not null default 1,
    id_medida int not null,
    id_lista int not null,
    primary key (id_item),
    index lista_it (id_lista asc) visible,
    constraint lista_it
		foreign key (id_lista)
        references tb_lista(id_lista),
	index status_li(id_status asc) visible,
    constraint status_li
		foreign key(id_status)
        references tb_status(id_status),
	index medida_item(id_medida asc) visible,
    constraint medida_item
		foreign key(id_medida)
        references tb_medida_item(id_medida)
        ) default character set utf8;