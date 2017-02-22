select b.*, bt."Type", bl."Name" as "BuildingName",
exists(select v."Id" from "Visit" v
  where v."BedId" = b."Id"
  and v."Intake" < now()
  and (v."Outtake" is null or v."Outtake" > now())
) as "Occupied"

from "Bed" B left outer join "BedType" BT on b."TypeId"  = bt."Id"

left outer join "Building" bl on b."BuildingId" = bl."Id"

order by bl."Name", b."Name"
