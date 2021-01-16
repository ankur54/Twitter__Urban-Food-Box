module.exports = {
    retrieveQueryString: query => {
        const search_query = []

        if (query.latitude && query.longitude && query.radius)
            search_query.push(`geocode:${query['latitude']},${query['longitude']},${query['radius']}`)
        if (query.username)
            search_query.push(`from:${query['username']}`)
        if (query.description)
            search_query.push(`"${query['description']}"`)
        if (query.tweetedon) {
            const date = query['tweetedon'].split('-');
            date[2] = (parseInt(date[2]) + 1).toString();
            search_query.push(`since:${query.tweetedon}`) 
            search_query.push(`until:${date.join('-')}`)
        }

        return search_query.join(' ')
    }
};