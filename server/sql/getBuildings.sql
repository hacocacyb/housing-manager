select *,
(Select count(*) from bed where bed."buildingId" = b.id) as "bedCount",
(select count(*) from visit v
  where v."buildingId" = b.id
  and v.intake < now()
  and (v.outtake is null or v.outtake > now())
) as occupied

from building b
