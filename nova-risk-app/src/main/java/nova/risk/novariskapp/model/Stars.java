package nova.risk.novariskapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data

public class Stars {
    @Id
    private String id;
    private double hip;
    private double hd;
    private double hr;
    private String gl;
    private String bf;
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
    private String bayer;
    private double flam;
    private String con;
    private long comp;
    private long comp_primary;
    private String base;
    private double lum;
    private String var;
    private double var_min;
    private double var_max;

    private boolean completado;

}
