import { Card, Paper, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { PieChart, BarChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Bar } from 'recharts';
import { withStyles } from "@material-ui/core/styles";

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
    const data = [
        { name: 'Livre', value: 18 },
        { name: 'Ocupado', value: 30 },
    ];
    const dataLine = [
        {
            name: 'Page A',
            livre: 4000,
            ocupado: 2400,
        },
        {
            name: 'Page B',
            livre: 3000,
            ocupado: 1398,
        },
        {
            name: 'Page C',
            livre: 2000,
            ocupado: 9800,
        },
        {
            name: 'Page D',
            livre: 2780,
            ocupado: 3908,
        },
        {
            name: 'Page E',
            livre: 1890,
            ocupado: 4800,
        },
        {
            name: 'Page F',
            livre: 2390,
            ocupado: 3800,
        },
        {
            name: 'Page G',
            livre: 3490,
            ocupado: 4300,
        },
    ];
    const COLORS = ['#4caf50', '#f44336'];
    const RADIAN = Math.PI / 180;
    return (
        <>
            <Card className={classes.card}>
                <Typography variant="h4"
                    align="center"
                    className={classes.title}>
                    Quantidade total
                </Typography>
                <ResponsiveContainer height={400}>
                    <PieChart width={800} height={800}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Card>
            <Card className={classes.card}>
                <Typography variant="h4"
                    align="center"
                    className={classes.title}>
                    Quantidade por categoria
                </Typography>
                <ResponsiveContainer height={400}>
                    <BarChart
                        width={500}
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
                        <Bar dataKey="livre" fill="#4caf50" />
                        <Bar dataKey="ocupado" fill="#f44336" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

        </>
    )
}

export default withStyles(styles)(OcupacaoChart)