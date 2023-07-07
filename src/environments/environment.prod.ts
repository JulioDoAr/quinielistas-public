export const environment = {
    production: false,
    path: {
        matchs: {
            url: 'assets/files/partidos.txt',
            url8: 'assets/files/partidos_8.txt',
            separator: {
                row: '/\r\n|\n|\r|\\n/g',
                team: ',',
            },
        },
        columns: {
            url: 'assets/files/columnas.txt',
            url8: 'assets/files/columnas_8.txt',
            separator: '/\r\n|\n|\r|\\n/g',
        },
    },
};
