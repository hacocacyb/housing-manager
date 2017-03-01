select b.*, bt.type, bl.name as "buildingName",
exists(select v.id from visit v
  where v."bedId" = b.id
  and v.intake < now()
  and (v.outtake is null or v.outtake > now())
) as "occupied"
from bed b left outer join "bedType" bt on b."typeId"  = bt."id"
left outer join "building" bl on b."buildingId" = bl.id
