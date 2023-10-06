package nova.risk.novariskapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Stars")
public class Stars {
    @Id
    private String _id;
    private int id;
    private String proper;
    private double ra;
    private double dec;
    private double dist;
    private double pmra;
    private double pmdec;
    private double rv;
    private double mag;
    private double absmag;
    private String spect;
    private double ci;
    private double x;
    private double y;
    private double z;
    private double vx;
    private double vy;
    private double vz;
    private double rarad;
    private double decrad;
    private double pmrarad;
    private double pmdecrad;
    private int comp;
    private int comp_primary;
    private double lum;
    private double p_supernova;

}
