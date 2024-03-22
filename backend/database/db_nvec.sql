create database if not exists db_nvec default character set utf8;
use db_nvec;

create table if not exists tb_status (
	id_status int auto_increment not null,
    ds_status varchar(30) not null,
    estado_status tinyint not null,
    primary key (id_status)
) default character set utf8;

create table if not exists tb_categoria (
	id_categoria int not null auto_increment,
    ds_categoria varchar(100) not null,
    primary key (id_categoria)
) default character set utf8;

create table if not exists tb_assinatura (
	id_assinatura int auto_increment not null,
    ds_assinatura varchar(30),
    primary key (id_assinatura)
) default character set utf8;

create table if not exists tb_pais (
	id_pais int not null auto_increment,
	nm_pais varchar(40),
    primary key (id_pais)
    ) default character set utf8;
    
create table if not exists tb_uf (
	id_uf int auto_increment not null,
    nm_uf varchar(40) not null,
    id_pais int not null,
    primary key (id_uf),
	index pais (id_Pais asc) visible,
    constraint pais 
		foreign key (id_pais)
        references tb_pais (id_pais)) default character set utf8;
        
create table if not exists tb_cidade (
	id_cidade int not null auto_increment,
    nm_cidade varchar(40),
    id_uf int not null,
    primary key (id_cidade),
    index uf (id_uf asc) visible,
    constraint uf
		foreign key (id_uf)
        references tb_uf (id_uf)) default character set utf8;
        
create table if not exists tb_bairro (
	id_bairro int auto_increment not null,
    nm_bairro varchar(40),
    id_cidade int not null,
    primary key (id_bairro),
    index cidade (id_cidade asc) visible,
    constraint cidade
		foreign key (id_cidade)
		references tb_cidade (id_cidade)) default character set utf8;
        
create table if not exists tb_endereco (
	id_endereco int auto_increment not null,
    id_bairro int not null,
    primary key (id_endereco),
    index bairro (id_bairro asc) visible,
    constraint bairro
		foreign key (id_bairro)
        references tb_bairro (id_bairro)) default character set utf8;
        
create table if not exists tb_usuario (
	id_usuario int not null auto_increment,
    nm_usuario varchar(100) not null,
    senha_usuario varchar(16) not null,
    email_usuario varchar(200) not null,
    id_assinatura int not null,
    primary key (id_usuario),
    index assinatura(id_assinatura asc) visible,
    constraint assinatura
		foreign key (id_assinatura)
		references tb_assinatura(id_assinatura)) default character set utf8;
        
create table if not exists tb_comunidade (
	id_comunidade int auto_increment not null,
    nm_comunidade varchar(30),
    id_categoria int not null,
    primary key (id_comunidade),
    index categoria_comunidade (id_categoria asc) visible,
    constraint categoria_comunidade
		foreign key (id_categoria) 
        references tb_categoria(id_categoria)
) default character set utf8;
        
create table if not exists tb_lista (
	id_lista int auto_increment not null,
    nm_lista varchar(100),
    dt_criacao datetime,
    ds_lista varchar(200),
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

create table if not exists tb_comunidade_lista (
	id_comunidade_lista int auto_increment not null,
    id_comunidade int not null,
    id_lista int not null,
    primary key (id_comunidade_lista),
    index comunidade_lista(id_comunidade asc) visible,
    constraint comunidade_lista
		foreign key (id_comunidade)
        references tb_comunidade(id_comunidade),
	index lista(id_lista asc) visible,
	constraint lista
		foreign key (id_lista)
        references tb_lista(id_lista)
) default character set utf8;

create table if not exists tb_endereco_usuario (
	id_endereco_usuario int auto_increment not null,
    id_endereco int,
    id_usuario int not null,
    primary key (id_endereco_usuario),
    index end_usuario(id_endereco asc) visible,
    constraint end_usuario
		foreign key (id_endereco)
        references tb_endereco(id_endereco),
	index usuario_end(id_usuario asc) visible,
	constraint usuario_end
		foreign key (id_usuario)
        references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_comunidade_usuario (
	id_comunidade_usuario int not null auto_increment,
    id_comunidade int not null,
    id_usuario int not null,
    primary key (id_comunidade_usuario),
    index comunidade_usuario(id_comunidade asc) visible,
    constraint comunidade_usuario
		foreign key (id_comunidade)
        references tb_comunidade(id_comunidade),
	index usuario (id_usuario asc) visible,
	constraint usuario
		foreign key (id_usuario)
        references tb_usuario(id_usuario)
) default character set utf8;
        
create table if not exists tb_endereco_comunidade (
	id_endereco_comunidade int auto_increment not null,
    id_endereco int not null,
    id_comunidade int not null,
    primary key (id_endereco_comunidade),
    index end_comunidade (id_endereco asc) visible,
    constraint end_comunidade
		foreign key (id_endereco)
        references tb_endereco(id_endereco),
	index comunidade (id_comunidade asc) visible,
	constraint comunidade
		foreign key (id_comunidade) 
        references tb_comunidade(id_comunidade)
) default character set utf8;

create table if not exists tb_item (
	id_item int not null auto_increment,
    nm_item varchar(100) not null,
	vl_uni decimal(10,2) not null,
    id_status int not null,
    id_lista int not null,
    primary key (id_item),
    index lista_it (id_lista asc) visible,
    constraint lista_it
		foreign key (id_lista)
        references tb_lista(id_lista),
	index status_li(id_status asc) visible,
    constraint status_li
		foreign key(id_status)
        references tb_status(id_status)) default character set utf8;
        
create table if not exists tb_renda (
	id_renda int not null auto_increment,
    ds_renda varchar(200),
    vl_renda decimal(10,2),
    dt_renda datetime,
    id_usuario int not null,
    primary key (id_renda),
    index renda_usuario(id_usuario asc) visible,
    constraint renda_usuario
		foreign key (id_usuario)
        references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_despesa_variavel (
	id_despesa_var int not null auto_increment,
    vl_despesa_var decimal(10,2),
    ds_despesa_var varchar(100),
    id_usuario int not null,
    primary key (id_despesa_var),
    index usuario_variavel(id_usuario asc) visible,
    constraint usuario_variavel
		foreign key (id_usuario)references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_despesa_fixa (
	id_despesa_fixa int not null auto_increment,
    vl_despesa_fixa decimal(10,2),
    ds_despesa_fixa varchar(100),
    id_usuario int not null,
    primary key (id_despesa_fixa),
    index usuario_fixa(id_usuario asc) visible,
    constraint usuario_fixa
		foreign key (id_usuario)
		references tb_usuario(id_usuario)
) default character set utf8;

create table if not exists tb_endereco_item (
	id_endereco_item int not null auto_increment,
    id_endereco int not null,
    id_item int not null,
    primary key (id_endereco_item),
    index end_item (id_endereco asc) visible,
    constraint end_item
		foreign key (id_endereco)
        references tb_endereco(id_endereco),
	index item (id_item asc) visible,
	constraint item
		foreign key(id_item) references tb_item(id_item)
) default character set utf8;
