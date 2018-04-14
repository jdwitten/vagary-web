function Trip(user, title, image, date, id) {
  this.user = user
  this.title = title
  this.image = image
  this.id = id
  this.date = date

  this.tripForPosting = function() {
    return {
      user: this.user,
      title: this.title,
      image: this.image,
      date: this.date
    }
  }
}

module.exports = Trip
