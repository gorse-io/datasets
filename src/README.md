---
home: true
icon: home
title: Home
heroImage: /logo.png
heroText: Gorse
tagline: An open-source recommender system service written in Go.
actions:
  - text: Documentation
    link: /docs/master/
    type: primary

  - text: Live Demo
    link: https://gitrec.gorse.io

  - text: " Chat with Docs"
    link: https://discordapp.com/users/1102376269598970006
    icon: discord

features:
  - title: Multi-source
    icon: si-glyph-multifunction-knife
    details: Recommend items from Popular, latest, user-based, item-based and collaborative filtering.

  - title: AutoML
    icon: brightness-auto
    details: Search the best recommendation model automatically in the background.

  - title: Distributed prediction
    icon: cluster
    details: Support horizontal scaling in the recommendation stage after single node training.

  - title: RESTful APIs
    icon: http
    details: Expose RESTful APIs for data CRUD and recommendation requests.

  - title: Multi-database support
    icon: database
    details: Support Redis, MySQL, Postgres, MongoDB, and ClickHouse as its storage backend.

  - title: Online evaluation
    icon: chart
    details: Analyze online recommendation performance from recently inserted feedback.

  - title: Dashboard
    icon: dashboard
    details: Provide GUI for data management, system monitoring, and cluster status checking.

  - title: Open source
    icon: open-source-fill
    details: The codebase is released under Apache 2 license and driven by the community.

---

Gorse is an open-source recommendation system written in Go. Gorse aims to be a universal open-source recommender system that can be easily introduced into a wide variety of online services. By importing items, users and interaction data into Gorse, the system will automatically train models to generate recommendations for each user.

# Quick Start

The playground mode has been prepared for beginners. Just set up a recommender system for GitHub repositories by following the commands.

::: code-tabs#setup

@tab:active Bash

```bash
curl -fsSL https://gorse.io/playground | bash
```

@tab Docker

```bash
docker run -p 8088:8088 zhenghaoz/gorse-in-one --playground
```

:::

The playground mode will download data from [GitRec][gitrec] and import it into Gorse. The dashboard is available at http://localhost:8088.

![](./img/dashboard-overview.png =580x)
![](./img/dashboard-tasks.png =580x)

After the "Find neighbors of items" task is completed on the "Tasks" page, try to insert several feedbacks into Gorse. Suppose Bob is a frontend developer who starred several frontend repositories in GitHub. We insert his star feedback to Gorse.

::: code-tabs#example

@tab:active HTTP

```bash
read -d '' JSON << EOF
[
    { \"FeedbackType\": \"star\", \"UserId\": \"bob\", \"ItemId\": \"vuejs:vue\", \"Timestamp\": \"2022-02-24\" },
    { \"FeedbackType\": \"star\", \"UserId\": \"bob\", \"ItemId\": \"d3:d3\", \"Timestamp\": \"2022-02-25\" },
    { \"FeedbackType\": \"star\", \"UserId\": \"bob\", \"ItemId\": \"dogfalo:materialize\", \"Timestamp\": \"2022-02-26\" },
    { \"FeedbackType\": \"star\", \"UserId\": \"bob\", \"ItemId\": \"mozilla:pdf.js\", \"Timestamp\": \"2022-02-27\" },
    { \"FeedbackType\": \"star\", \"UserId\": \"bob\", \"ItemId\": \"moment:moment\", \"Timestamp\": \"2022-02-28\" }
]
EOF

curl -X POST http://127.0.0.1:8088/api/feedback \
   -H 'Content-Type: application/json' \
   -d "$JSON"
```

@tab Go

```go
import "github.com/zhenghaoz/gorse/client"

gorse := client.NewGorseClient("http://127.0.0.1:8088", "")

gorse.InsertFeedback([]client.Feedback{
    {FeedbackType: "star", UserId: "bob", ItemId: "vuejs:vue", Timestamp: "2022-02-24"},
    {FeedbackType: "star", UserId: "bob", ItemId: "d3:d3", Timestamp: "2022-02-25"},
    {FeedbackType: "star", UserId: "bob", ItemId: "dogfalo:materialize", Timestamp: "2022-02-26"},
    {FeedbackType: "star", UserId: "bob", ItemId: "mozilla:pdf.js", Timestamp: "2022-02-27"},
    {FeedbackType: "star", UserId: "bob", ItemId: "moment:moment", Timestamp: "2022-02-28"},
})
```

@tab Python

```python
from gorse import Gorse

client = Gorse('http://127.0.0.1:8088', '')

client.insert_feedbacks([
    { 'FeedbackType': 'star', 'UserId': 'bob', 'ItemId': 'vuejs:vue', 'Timestamp': '2022-02-24' },
    { 'FeedbackType': 'star', 'UserId': 'bob', 'ItemId': 'd3:d3', 'Timestamp': '2022-02-25' },
    { 'FeedbackType': 'star', 'UserId': 'bob', 'ItemId': 'dogfalo:materialize', 'Timestamp': '2022-02-26' },
    { 'FeedbackType': 'star', 'UserId': 'bob', 'ItemId': 'mozilla:pdf.js', 'Timestamp': '2022-02-27' },
    { 'FeedbackType': 'star', 'UserId': 'bob', 'ItemId': 'moment:moment', 'Timestamp': '2022-02-28' }
])
```

@tab TypeScript

```javascript
import { Gorse } from "gorsejs";

const client = new Gorse({ endpoint: "http://127.0.0.1:8088", secret: "" });

await client.insertFeedbacks([
    { FeedbackType: 'star', UserId: 'bob', ItemId: 'vuejs:vue', Timestamp: '2022-02-24' },
    { FeedbackType: 'star', UserId: 'bob', ItemId: 'd3:d3', Timestamp: '2022-02-25' },
    { FeedbackType: 'star', UserId: 'bob', ItemId: 'dogfalo:materialize', Timestamp: '2022-02-26' },
    { FeedbackType: 'star', UserId: 'bob', ItemId: 'mozilla:pdf.js', Timestamp: '2022-02-27' },
    { FeedbackType: 'star', UserId: 'bob', ItemId: 'moment:moment', Timestamp: '2022-02-28' }
]);
```

@tab Java

```java
import io.gorse.gorse4j.*;

Gorse client = new Gorse(GORSE_ENDPOINT, GORSE_API_KEY);

List<Feedback> feedbacks = List.of(
        new Feedback("star", "bob", "vuejs:vue", "2022-02-24"),
        new Feedback("star", "bob", "d3:d3", "2022-02-25"),
        new Feedback("star", "bob", "dogfalo:materialize", "2022-02-26"),
        new Feedback("star", "bob", "mozilla:pdf.js", "2022-02-27"),
        new Feedback("star", "bob", "moment:moment", "2022-02-28")
);
client.insertFeedback(feedbacks);
```

@tab Rust

```rust
use gorse_rs::{Feedback, Gorse};

let client = Gorse::new("http://127.0.0.1:8088", "");

let feedback = vec![
    Feedback::new("star", "bob", "vuejs:vue", "2022-02-24"),
    Feedback::new("star", "bob", "d3:d3", "2022-02-25"),
    Feedback::new("star", "bob", "dogfalo:materialize", "2022-02-26"),
    Feedback::new("star", "bob", "mozilla:pdf.js", "2022-02-27"),
    Feedback::new("star", "bob", "moment:moment", "2022-02-28")
];
client.insert_feedback(&feedback).await;
```

@tab Ruby

```ruby
require 'gorse'

client = Gorse.new('http://127.0.0.1:8088', 'api_key')

client.insert_feedback([
    Feedback.new("star", "bob", "vuejs:vue", "2022-02-24"),
    Feedback.new("star", "bob", "d3:d3", "2022-02-25"),
    Feedback.new("star", "bob", "dogfalo:materialize", "2022-02-26"),
    Feedback.new("star", "bob", "mozilla:pdf.js", "2022-02-27"),
    Feedback.new("star", "bob", "moment:moment", "2022-02-28")
])
```

@tab PHP

```php
$client = new Gorse("http://127.0.0.1:8088/", "api_key");

$rowsAffected = $client->insertFeedback([
    new Feedback("star", "bob", "vuejs:vue", "2022-02-24"),
    new Feedback("star", "bob", "d3:d3", "2022-02-25"),
    new Feedback("star", "bob", "dogfalo:materialize", "2022-02-26"),
    new Feedback("star", "bob", "mozilla:pdf.js", "2022-02-27"),
    new Feedback("star", "bob", "moment:moment", "2022-02-28")
]);
```

@tab .NET

```cs
using Gorse.NET;

var client = new Gorse("http://127.0.0.1:8087", "api_key");

client.InsertFeedback(new Feedback[]
{
    new Feedback{FeedbackType="star", UserId="bob", ItemId="vuejs:vue", Timestamp="2022-02-24"},
    new Feedback{FeedbackType="star", UserId="bob", ItemId="d3:d3", Timestamp="2022-02-25"},
    new Feedback{FeedbackType="star", UserId="bob", ItemId="dogfalo:materialize", Timestamp="2022-02-26"},
    new Feedback{FeedbackType="star", UserId="bob", ItemId="mozilla:pdf.js", Timestamp="2022-02-27"},
    new Feedback{FeedbackType="star", UserId="bob", ItemId="moment:moment", Timestamp="2022-02-28"},
});
```

:::

Then, fetch 10 recommended items from Gorse. We can find that frontend-related repositories are recommended for Bob.

::: code-tabs#example

@tab:active HTTP

```bash
curl http://127.0.0.1:8088/api/recommend/bob?n=10
```

@tab Go

```go
gorse.GetRecommend("bob", "", 10)
```

@tab Python

```python
client.get_recommend('bob', n=10)
```

@tab TypeScript

```javascript
await client.getRecommend({ userId: 'bob', cursorOptions: { n: 10 } });
```

@tab Java

```java
client.getRecommend("bob");
```

@tab Rust

```rust
client.get_recommend("bob").await;
```

@tab Ruby

```ruby
client.get_recommend('10')
```

@tab PHP

```php
$client->getRecommend('10');
```

@tab .NET

```cs
client.GetRecommend("10");
```

:::

```json
[
  "mbostock:d3",
  "nt1m:material-framework",
  "mdbootstrap:vue-bootstrap-with-material-design",
  "justice47:f2-vue",
  "10clouds:cyclejs-cookie",
  "academicpages:academicpages.github.io",
  "accenture:alexia",
  "addyosmani:tmi",
  "1wheel:d3-starterkit",
  "acdlite:redux-promise"
]
```

> The exact output might be different from the example since the playground dataset changes over time.

[gitrec]: https://gitrec.gorse.io
