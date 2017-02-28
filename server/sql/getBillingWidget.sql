select * from (select v.id as "visitId",
v."intake",
v."outtake",
p."first" || ' ' || p."last" as "fullName",
  bl."name" as "buildingName",
  (floor(EXTRACT( DAY FROM (now() - v."intake")) / (v."rentalPeriodId" * 7)) + 1) * v."cost" as "totalBilled",
	greatest(0, (select sum(p."amount") from "payment" p where p."visitId" = v."id")) as "payments",
  (floor(EXTRACT( DAY FROM (now() - v."intake")) / (v."rentalPeriodId" * 7))) * v."cost" as "dueBilled"

from "visit" v
left outer join "person" p on v."personId" = p."id"
left outer join "building" bl on v."buildingId" = bl."id"

where v."outtake" is null or v."outtake" > now()) as q
WHERE q."dueBilled" - q."payments" > 0
