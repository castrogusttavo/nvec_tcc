create view vw_relatorio as
select
    u.id_usuario,
    l.id_lista,
    l.rd_lista,
    i.vl_uni,
    i.qtde_item
from
    tb_item i
join
    tb_lista l on i.id_lista = l.id_lista
join
    tb_usuario u on l.id_usuario = u.id_usuario
where
    i.id_status = 2;


create view view_total_lista as
select lv.id_usuario,
       lv.id_lista_variavel,
       lv.end_lista,
       u.nm_usuario,
       lv.id_lista_fixa,
       sum(iv.vl_uni * ifx.qtde_item) as valor_total
from tb_item_variavel iv
join tb_lista_variavel lv on lv.id_lista_variavel = iv.id_lista_variavel
join tb_lista_fixa lf on lf.id_lista_fixa = lv.id_lista_fixa
join tb_item_fixo ifx on ifx.id_item_fixo = iv.id_item_fixo
join tb_usuario u on u.id_usuario = lv.id_usuario
group by lv.id_usuario, lv.id_lista_variavel;