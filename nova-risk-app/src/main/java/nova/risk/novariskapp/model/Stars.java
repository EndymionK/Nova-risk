package nova.risk.novariskapp.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Stars")
public class Stars {
    @Id
    private String _id;
    private String hip;
    private String hd;
    private String hr;
    private String gl;
    private String bf;
    private String proper;
    private Double ra;
    private Double dec;
    private Double dist;
    private Double pmra;
    private Double pmdec;
    private Double rv;
    private Double mag;
    private Double absmag;
    private String spect;
    private String ci;
    private Double x;
    private Double y;
    private Double z;
    private Double vx;
    private Double vy;
    private Double vz;
    private Double rarad;
    private Double decrad;
    private Double pmrarad;
    private Double pmdecrad;
    private String bayer;
    private Double flam;
    private String con;
    private int comp;
    private int comp_primary;
    private String base;
    private Double lum;
    private String var;
    private Double var_min;
    private Double var_max;
    private Double pSupernova;

}
