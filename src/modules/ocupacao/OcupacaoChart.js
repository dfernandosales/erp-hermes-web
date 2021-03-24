import { Card, Tooltip, Typography, Grid, FormControlLabel } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { PieChart, BarChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Bar } from 'recharts';
import { withStyles } from "@material-ui/core/styles";
import ocupacaoRepository from './ocupacaoRepository';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    card: {
        padding: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(3),
    },
});

const OcupacaoChart = (props) => {
    const { classes } = props;
    const [ocupados, setOcupados] = useState(0)
    const [vagos, setVagos] = useState(0)
    const [dataLine, setDataLine] = useState();
    const [allChart, setAllChart] = useState(false);
    const [categoryChart, setCategoryChart] = useState(false);


    useEffect(async () => {
        const dataTudo = await ocupacaoRepository.list({ query: { type: "Tudo" } });
        setVagos(dataTudo.data.livre.total);
        setOcupados(dataTudo.data.ocupado.total);
        const data = await ocupacaoRepository.list();
        setDataLine(data.data);
    }, [])

    const data = [
        { name: 'Livre', value: vagos },
        { name: 'Ocupado', value: ocupados },
    ];
    const COLORS = ['#4caf50', '#f44336'];
    return (
        <>
            <Card className={classes.card}>
                <Grid container>

                    <Grid item sm={6} xs={12}>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                checked={allChart}
                                onChange={() => setAllChart(!allChart)}
                                value="checkedA"
                            />}
                            label="Grafico da ocupacao dos quartos(GERAL)"
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <FormControlLabel
                            value="end"
                            control={<Checkbox
                                checked={categoryChart}
                                onChange={() => setCategoryChart(!categoryChart)}
                                
    
                            />}
                            label="Grafico da ocupacao dos quartos por categoria"
                            labelPlacement="end"
                        />
                        
                    </Grid>
                </Grid>
            </Card>
            {allChart && <Card className={classes.card}>
                <Typography variant="h4"
                    className={classes.title}>
                    Geral
                </Typography>
                {(vagos || ocupados) ?
                    <ResponsiveContainer height={400}>
                        <PieChart width={800} height={800}>
                            <Legend />
                            <Tooltip />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer> : <Typography align="center" variant="h5"> Ainda nao foi cadastrado um quarto no sistema.</Typography>}
            </Card>}
            { categoryChart &&
                <Card className={classes.card}>
                    <Typography variant="h4"
                        className={classes.title}>
                        Categoria
                </Typography>
                    {categoryChart && dataLine?.length > 0 ? <ResponsiveContainer height={400}>
                        <BarChart
                            width={300}
                            height={300}
                            data={dataLine}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Livre" fill="#4caf50" />
                            <Bar dataKey="Ocupado" fill="#f44336" />
                        </BarChart>
                    </ResponsiveContainer> : <Typography align="center" variant="h5"> Ainda nao foi cadastrado um quarto no sistema.</Typography>}
                </Card>
            }
        </>
    )
}

export default withStyles(styles)(OcupacaoChart)