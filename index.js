const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Details {
    author_img: String
    description: String
    img_cover: String
  }
  type Book {
    id: ID
    title: String
    year: Int
    img_url: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    details: Details
    books: [Book]
  }
`;

const details = {
  description: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).",
  author_img: "https://www.cheatsheet.com/wp-content/uploads/2019/03/jk-rowling.jpg",
  img_cover: "https://i.imgur.com/i60csTi.jpg",
}

const books = [{
  id: 1,
  title: 'Harry Potter and the Philosophers Stone',
  year: 1997,
  img_url: 'https://prnewswire2-a.akamaihd.net/p/1893751/sp/189375100/thumbnail/entry_id/0_23gvk690/def_height/500/def_width/500/version/100012/type/1',
},
{
  id: 2,
  title: 'Harry Potter and the Chamber of Secrets',
  year: 1998,
  img_url: 'https://i.pinimg.com/originals/87/5b/e0/875be0aea02180e0d91b72cdc1b97177.jpg',
},
{
  id: 3,
  title: 'Harry Potter and the Prisoner of Azkaban',
  year: 1999,
  img_url: 'https://ewedit.files.wordpress.com/2016/09/9781408855676.jpg?w=409',
},
{
  id: 4,
  title: 'Harry Potter and the Goblet of Fire',
  year: 2000,
  img_url: 'https://playone.com.lb/images/detailed/2329/81t2CVWEsUL.jpg',
},
{
  id: 5,
  title: 'Harry Potter and the Order of the Phoenix',
  year: 2003,
  img_url: 'https://images-na.ssl-images-amazon.com/images/I/81yheYBjiuL.jpg',
},
{
  id: 6,
  title: 'Harry Potter and the Half-Blood Prince',
  year: 2005,
  img_url: 'https://i0.books-express.ro/be/9781408855706/harry-potter-and-the-half-blood-prince.jpg',
},
{
  id: 7,
  title: 'Harry Potter and The Deathly hallows',
  year: 2007,
  img_url: 'https://whatdewhat.com/wp-content/uploads/2017/06/image-mcmbuzz.com_.jpg',
},
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        details: () => details,
        books: () => books,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});