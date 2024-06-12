delimiter $

create procedure comparacao(
	id_comunidade int
) begin

select *
from tb_comunidade c
join tb_lista_fixa lf on c.id_comunidade = lf.id_lista_fixa
join tb_lista_variavel lv on lf.id_lista_fixa = lv.id_lista_fixa
join tb_usuario u on lv.id_usuario = u.id_usuario
join (
    select lv.id_lista_variavel, 
		sum(iv.vl_uni * ifx.qtde_item) as totalLista
    from tb_lista_variavel lv
    join tb_item_variavel iv on lv.id_lista_variavel = iv.id_lista_variavel
    join tb_item_fixo ifx on iv.id_item_fixo = ifx.id_item_fixo
    group by lv.id_lista_variavel
) total on lv.id_lista_variavel = total.id_lista_variavel
where c.id_comunidade = id_comunidade
order by total.totalLista asc
limit 1;

end $
