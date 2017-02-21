select v.*,
	p."First", p."Last",
  bl."Name" as "BuildingName", bed."Name" as "BedName"

from "Visit" v
left outer join "Person" p on v."PersonId" = p."Id"
left outer join "Building" bl on v."BuildingId" = bl."Id"
left outer join "Bed" bed on v."BedId" = bed."Id"

order by v."Intake" desc
