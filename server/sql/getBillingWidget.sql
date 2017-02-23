select * from (select v."Id" as "VisitId",
v."Intake",
v."Outtake",
p."First" || ' ' || p."Last" as "FullName",
  bl."Name" as "BuildingName",
  (floor(EXTRACT( DAY FROM (now() - v."Intake")) / (v."PayTypeId" * 7)) + 1) * v."Cost" as "TotalBilled",
	greatest(0, (select sum(p."Amount") from "Payment" p where p."VisitId" = v."Id")) as "Payments",
  (floor(EXTRACT( DAY FROM (now() - v."Intake")) / (v."PayTypeId" * 7))) * v."Cost" as "DueBilled"

from "Visit" v
left outer join "Person" p on v."PersonId" = p."Id"
left outer join "Building" bl on v."BuildingId" = bl."Id"

where v."Outtake" is null or v."Outtake" > now()) as q
WHERE q."DueBilled" - q."Payments" > 0
