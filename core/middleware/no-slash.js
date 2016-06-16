export default () => function * (next) {
	const { url, querystring } = this.request
	if (!querystring && url != '/' && /\/$/.test(url)) {
		this.response.status = 301
		this.response.redirect(url.slice(0, url.length - 1))
		return
	}

	yield next
}
