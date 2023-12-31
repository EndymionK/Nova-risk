package nova.risk.novariskapp.controller;
import nova.risk.novariskapp.model.StarsResume;
import org.bson.types.ObjectId;
import nova.risk.novariskapp.model.Stars;
import nova.risk.novariskapp.repo.StarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/Stars")
public class StarsController {
    private final StarsRepository starsRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public StarsController(StarsRepository starsRepository, MongoTemplate mongoTemplate) {
        this.starsRepository = starsRepository;
        this.mongoTemplate = mongoTemplate;
    }


    @GetMapping("")
    public ResponseEntity<Page<Stars>> index(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {

        PageRequest pageRequest = PageRequest.of(page, size);

        Criteria criteria = new Criteria().orOperator(
                Criteria.where("proper").regex(search, "i"),
                Criteria.where("hip").regex(search, "i"),
                Criteria.where("hd").regex(search, "i"),
                Criteria.where("hr").regex(search, "i"),
                Criteria.where("bf").regex(search, "i"),
                Criteria.where("gl").regex(search, "i")
        );

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(criteria),
                Aggregation.skip((long) pageRequest.getPageNumber() * pageRequest.getPageSize()),
                Aggregation.limit(pageRequest.getPageSize())
        );

        Query countQuery = new Query(criteria);
        long totalResults = mongoTemplate.count(countQuery, Stars.class);

        AggregationResults<Stars> results = mongoTemplate.aggregate(aggregation, "Stars", Stars.class);
        List<Stars> filteredStars = results.getMappedResults();

        Page<Stars> filteredStarsPage = new PageImpl<>(filteredStars, pageRequest, totalResults);

        return ResponseEntity.ok(filteredStarsPage);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Stars> getStarById(@PathVariable String id) {
        Optional<Stars> star = starsRepository.findById(id);
        return star.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Stars create(@RequestBody Stars stars) {
        return starsRepository.save(stars);
    }

    @PutMapping("/{_id}")
    Stars update(@PathVariable String _id,@RequestBody Stars stars) throws Exception {

        Stars starsFromDb = starsRepository.findById(String.valueOf(_id)).orElseThrow(Exception::new);


        starsFromDb.setHip(stars.getHip());
        starsFromDb.setHd(stars.getHd());
        starsFromDb.setHr(stars.getHr());
        starsFromDb.setGl(stars.getGl());
        starsFromDb.setBf(stars.getBf());
        starsFromDb.setProper(stars.getProper());
        starsFromDb.setRa(stars.getRa());
        starsFromDb.setDec(stars.getDec());
        starsFromDb.setDist(stars.getDist());
        starsFromDb.setPmra(stars.getPmra());
        starsFromDb.setPmdec(stars.getPmdec());
        starsFromDb.setRv(stars.getRv());
        starsFromDb.setMag(stars.getMag());
        starsFromDb.setAbsmag(stars.getAbsmag());
        starsFromDb.setSpect(stars.getSpect());
        starsFromDb.setCi(stars.getCi());
        starsFromDb.setX(stars.getX());
        starsFromDb.setY(stars.getY());
        starsFromDb.setZ(stars.getZ());
        starsFromDb.setVx(stars.getVx());
        starsFromDb.setVy(stars.getVy());
        starsFromDb.setVz(stars.getVz());
        starsFromDb.setRarad(stars.getRarad());
        starsFromDb.setDecrad(stars.getDecrad());
        starsFromDb.setPmrarad(stars.getPmrarad());
        starsFromDb.setPmdecrad(stars.getPmdecrad());
        starsFromDb.setBayer(stars.getBayer());
        starsFromDb.setFlam(stars.getFlam());
        starsFromDb.setCon(stars.getCon());
        starsFromDb.setComp(stars.getComp());
        starsFromDb.setComp_primary(stars.getComp_primary());
        starsFromDb.setBase(stars.getBase());
        starsFromDb.setLum(stars.getLum());
        starsFromDb.setVar(stars.getVar());
        starsFromDb.setVar_min(stars.getVar_min());
        starsFromDb.setVar_max(stars.getVar_max());
        starsFromDb.setPSupernova(stars.getPSupernova());


        return starsRepository.save(starsFromDb);

    }

    @DeleteMapping("/{_id}")
    public ResponseEntity<?> deleteStar(@PathVariable ObjectId _id) {
        try {
            Stars star = starsRepository.findById(String.valueOf(_id)).orElse(null);

            if (star != null) {
                starsRepository.delete(star);
                return ResponseEntity.noContent().build(); // Solicitud exitosa (204 No Content)
            } else {
                return ResponseEntity.notFound().build(); // No se encontró la estrella (404 Not Found)
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Error interno del servidor (500 Internal Server Error)
        }
    }

    @Autowired
    @GetMapping("/ClosestSupernovae")
    public ResponseEntity<List<Stars>> getClosestSupernovae() {
        // Crea una consulta de agregación para MongoDB
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("pSupernova").gt(80.0).and("dist").exists(true)),
                Aggregation.sort(Sort.by(Sort.Direction.ASC, "dist")),
                Aggregation.limit(1000)
        );

        // Ejecuta la consulta de agregación en la base de datos
        AggregationResults<Stars> results = mongoTemplate.aggregate(aggregation, "Stars", Stars.class);

        // Obtener los resultados
        List<Stars> stars = results.getMappedResults();

        return ResponseEntity.ok(stars);
    }

    @Autowired
    @GetMapping(value = "/StarsResume", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StarsResume> getStarsResume() {
        Aggregation aggregation;
        aggregation = Aggregation.newAggregation(
                Aggregation.group()
                        .count().as("quantityStars")
                        .avg("pSupernova").as("averagepSupernova")
                        .avg("dist").as("averageDistance")
                        .avg("lum").as("averageLuminosity")
                        .avg("rv").as("averageRadialVelocity")
                        .avg("mag").as("averageMagnitude")
        );

        AggregationResults<StarsResume> results = mongoTemplate.aggregate(aggregation, "Stars", StarsResume.class);

        StarsResume starsResume = results.getUniqueMappedResult();

        if (starsResume != null) {
            // Redondear los valores a dos decimales
            starsResume.setAveragepSupernova(roundToTwoDecimalPlaces(starsResume.getAveragepSupernova()));
            starsResume.setAverageDistance(roundToTwoDecimalPlaces(starsResume.getAverageDistance()));
            starsResume.setAverageLuminosity(roundToTwoDecimalPlaces(starsResume.getAverageLuminosity()));
            starsResume.setAverageRadialVelocity(roundToTwoDecimalPlaces(starsResume.getAverageRadialVelocity()));
            starsResume.setAverageMagnitude(roundToTwoDecimalPlaces(starsResume.getAverageMagnitude()));
        }

        return ResponseEntity.ok(starsResume);
    }

    // Función para redondear un número a dos decimales
    private double roundToTwoDecimalPlaces(double value) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

}
