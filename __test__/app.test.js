const request = require('supertest')
const app = require('../app')
const { User, Photo } = require('../models')
const { generateToken } = require("../helpers/jwt");


describe("POST user/register", () => {

    afterAll(async () => {
        try {
            await User.destroy({where: {} });
        } catch (error) {
            console.log(error);
        }
    });

    it("Should be response 201", (done) => {
        request(app)
        .post("/user/register")
        .send({
            username: "admin",
            email: "harusbisajuga@gmail.com",
            password: "12345678",
        })

        .expect(201)
      .end((err, res) => {
        if (err) {
       return done(err);}
        expect(res.body.username).toEqual("admin");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("username");
        if (!done.called) {
            done.called = true;
            done();
          }
    });
});
it("Error 500 Expected", (done) => {
    request(app)
    .post("/user/register")
    .send({
        username: "admin",
        email: "harusbisajuga@mail.com",
        password: "12345678",
    })
    .expect(500)
    .end((err, res) => {
        if (!done.called) {
            done.called = true;
            done();
          }
        });
        
    });
});

  describe("POST user/login", () => {
    afterAll(async () => {
      try {
        await User.destroy({ where: {} });
      } catch (error) {
        console.log(error);
      }
    });
  
    beforeAll(async () => {
      try {
        await User.create({
          username: "admin",
          email: "harusbisajuga@gmail.com",
          password: "12345678",
        });
      } catch (error) {
        console.log(error);
      }
    });
  
    it("Should response 200", (done) => {
      request(app)
        .post("/user/login")
        .send({
          email: "harusbisajuga@gmail.com",
          password: "12345678",
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
  
          expect(res.body).toHaveProperty("access_token");
          done();
        });
    });
});
describe("PhotoController", () => {
  describe("GetAllPhotos", () => {
    beforeAll(async () => {
      try {
        await User.destroy({ where: {} });
        await Photo.destroy({ where: {} });

        user = await User.create({
          email: "letmefinishthisplease@gmail.com",
          password: "endthisassignment",
          username: "agoodfellow",
        });

        authToken = generateToken({
          id: user.id,
          email: user.email,
          username: user.username,
        });

        console.log('Generated auth token:', authToken);

        photo = await Photo.create({
          title: "Photo 1",
          caption: "Description 1",
          image_url: "http://example.com/photo1.jpg",
          UserId: User.Id
        }); 
      } catch (error) {
        console.log(error);
      }
    });
    it("should return an array of photos datas", (done) => {
      request(app)
        .get("/photos")
        .set("access_token", `${authToken}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body[0]).toMatchObject({
            title: "Photo 1",
            caption: "Description 1",
            image_url: "http://example.com/photo1.jpg"
          });
          done();
        });
    });

    it("Error 401 Expected", (done) => {
      request(app)
        .get("/photos")
        .expect(401)
        .end((err, res) => {
          if (err) done(err);

          

          done();
        });
    });
  });
  describe("GET /photo/:id", () => {
    let photo;  
    beforeAll(async () => {
        try {
            await User.destroy({where: {} });
            await Photo.destroy({where: {} });

            const user = await User.create({
                id: 80,
                username: "admin",
                email: "harusbisajuga@gmail.com",
                password: "12345678"
            });

            authToken = generateToken({
              id: user.id,
              email: user.email,
              username: user.username,
            }); 

            photo = await Photo.create({
                id: 80,
                title: "Photo 1",
                caption: "Description 1",
                image_url: "http://example.com/photo1.jpg",
                UserId: user.id
            });
            console.log("Photo object created successfully:", photo);
        } catch (error) {
            console.log(error);
        }
    });

    it("Should response with an array of the expected photo id", (done) => {
        request(app)
        .get(`/photo/80`)
        .set("access_token", `${authToken}`)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            console.log('Response body:', res.body);
            expect(res.body).toEqual('Photo 1');
            // expect(res.body.caption).toEqual(photo.caption);
            // expect(res.body.image_url).toEqual(photo.image_url);
            // expect(res.body.UserId).toEqual(photo.UserId);
            done();
        });
    });

    it("404 Error Expected", (done) => {
        request(app)
        .get(`/photo/999`)
        .set("access_token", `${authToken}`)
        .expect(404)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).toEqual({});
            done();
        });
    });
});
describe("CreatePhoto", () => {
  let authToken;
  let user;

  beforeAll(async () => {
    try {
      await User.destroy({ where: {} });
      await Photo.destroy({ where: {} });

      user = await User.create({
        email: "letmefinishthisplease@gmail.com",
        password: "endthisassignment",
        username: "agoodfellow",
      });

      authToken = generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      console.log('Generated auth token:', authToken);
    } catch (error) {
      console.log(error);
    }
  });

  it("should create a new photo", (done) => {
    request(app)
      .post("/photos")
      .set("access_token", `${authToken}`)
      .send({
        title: "Photo 2",
        caption: "Description 2",
        image_url: "http://example.com/photo2.jpg",
        UserId: user.id,
      })
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.title).toEqual("Photo 2");
        expect(res.body.caption).toEqual("Description 2");
        expect(res.body.image_url).toEqual("http://example.com/photo2.jpg");
        expect(res.body.UserId).toEqual(user.id);
        done();
      });
  });

  it("should return a 401 error if user is not authenticated", (done) => {
    request(app)
      .post("/photos")
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
});
});
