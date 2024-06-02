CREATE VIEW vw_relatorio AS
SELECT
    u.id_usuario,
    l.id_lista,
    l.rd_lista,
    i.vl_uni,
    i.qtde_item
FROM
    tb_item i
JOIN
    tb_lista l ON i.id_lista = l.id_lista
JOIN
    tb_usuario u ON l.id_usuario = u.id_usuario
WHERE
    i.id_status = 2;