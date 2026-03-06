// Comprehensive Jobs Database with LinkedIn-style detailed information
// This file contains job templates that will be used to generate thousands of jobs

export interface JobListing {
  id: number
  title: string
  company: string
  companyLogo: string
  companyDescription: string
  location: string
  locationType: "On-site" | "Remote" | "Hybrid"
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Unpaid Internship" | "Freelance"
  experienceLevel: "Entry level" | "Associate" | "Mid-Senior level" | "Director" | "Executive" | "Fresher/Student"
  isPaid: boolean
  stipend?: string
  function: string
  industry: string
  salary: string
  posted: string
  applicants: number
  category: string
  skills: string[]
  aboutJob: string
  positionOverview: string
  keyResponsibilities: string[]
  preferredQualifications: string[]
  educationalRequirements: string[]
  toolsAndTechnologies: string[]
  benefits: string[]
  companySize: string
  companyWebsite: string
  applyUrl: string
}

// Company data with logos (using clearbit logo API)
const companies = [
  // Tech Giants
  { name: "Google", logo: "https://logo.clearbit.com/google.com", size: "10,001+ employees", website: "https://google.com", description: "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, and AI.", industry: "Internet" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", size: "10,001+ employees", website: "https://microsoft.com", description: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, and related services.", industry: "Software" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", size: "10,001+ employees", website: "https://amazon.com", description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.", industry: "E-commerce" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com", size: "10,001+ employees", website: "https://meta.com", description: "Meta Platforms, Inc. is an American multinational technology conglomerate focused on social media, virtual reality, and the metaverse.", industry: "Social Media" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com", size: "10,001+ employees", website: "https://apple.com", description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, software, and online services.", industry: "Consumer Electronics" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", size: "5,001-10,000 employees", website: "https://netflix.com", description: "Netflix, Inc. is an American subscription streaming service and production company offering a library of films and television series.", industry: "Entertainment" },
  { name: "Uber", logo: "https://logo.clearbit.com/uber.com", size: "10,001+ employees", website: "https://uber.com", description: "Uber Technologies, Inc. is an American technology company offering ride-hailing, food delivery, package delivery, and freight transport services.", industry: "Transportation" },
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", size: "5,001-10,000 employees", website: "https://airbnb.com", description: "Airbnb, Inc. is an American company operating an online marketplace for lodging, primarily homestays and vacation rentals.", industry: "Travel" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", size: "10,001+ employees", website: "https://salesforce.com", description: "Salesforce, Inc. is an American cloud-based software company providing customer relationship management software and applications.", industry: "Software" },
  { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", size: "10,001+ employees", website: "https://adobe.com", description: "Adobe Inc. is an American multinational computer software company known for creativity and multimedia software products.", industry: "Software" },
  
  // Indian IT Companies
  { name: "TCS", logo: "https://logo.clearbit.com/tcs.com", size: "10,001+ employees", website: "https://tcs.com", description: "Tata Consultancy Services is an Indian multinational IT services and consulting company headquartered in Mumbai.", industry: "IT Services" },
  { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com", size: "10,001+ employees", website: "https://infosys.com", description: "Infosys Limited is an Indian multinational IT company providing business consulting, information technology, and outsourcing services.", industry: "IT Services" },
  { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com", size: "10,001+ employees", website: "https://wipro.com", description: "Wipro Limited is an Indian multinational corporation providing IT, consulting, and business process services.", industry: "IT Services" },
  { name: "HCL Technologies", logo: "https://logo.clearbit.com/hcltech.com", size: "10,001+ employees", website: "https://hcltech.com", description: "HCL Technologies is an Indian multinational IT services and consulting company headquartered in Noida.", industry: "IT Services" },
  { name: "Tech Mahindra", logo: "https://logo.clearbit.com/techmahindra.com", size: "10,001+ employees", website: "https://techmahindra.com", description: "Tech Mahindra Limited is an Indian multinational subsidiary of the Mahindra Group, providing IT and business process outsourcing services.", industry: "IT Services" },
  
  // Indian Startups & Unicorns
  { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com", size: "10,001+ employees", website: "https://flipkart.com", description: "Flipkart is an Indian e-commerce company headquartered in Bangalore. It is one of the largest e-commerce marketplaces in India.", industry: "E-commerce" },
  { name: "Paytm", logo: "https://logo.clearbit.com/paytm.com", size: "5,001-10,000 employees", website: "https://paytm.com", description: "Paytm is an Indian multinational financial technology company specializing in digital payment systems and financial services.", industry: "Fintech" },
  { name: "Swiggy", logo: "https://logo.clearbit.com/swiggy.com", size: "5,001-10,000 employees", website: "https://swiggy.com", description: "Swiggy is an Indian online food ordering and delivery platform founded in 2014 and headquartered in Bangalore.", industry: "Food Delivery" },
  { name: "Zomato", logo: "https://logo.clearbit.com/zomato.com", size: "5,001-10,000 employees", website: "https://zomato.com", description: "Zomato is an Indian multinational restaurant aggregator and food delivery company founded in 2008.", industry: "Food Delivery" },
  { name: "Ola", logo: "https://logo.clearbit.com/olacabs.com", size: "5,001-10,000 employees", website: "https://olacabs.com", description: "Ola Cabs is an Indian multinational ride-hailing company offering services including ride-hailing, food delivery, and financial services.", industry: "Transportation" },
  { name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com", size: "1,001-5,000 employees", website: "https://razorpay.com", description: "Razorpay is an Indian fintech company that provides online payment solutions for businesses.", industry: "Fintech" },
  { name: "PhonePe", logo: "https://logo.clearbit.com/phonepe.com", size: "1,001-5,000 employees", website: "https://phonepe.com", description: "PhonePe is an Indian digital payments and financial services company headquartered in Bangalore.", industry: "Fintech" },
  { name: "BYJU'S", logo: "https://logo.clearbit.com/byjus.com", size: "10,001+ employees", website: "https://byjus.com", description: "BYJU'S is an Indian multinational educational technology company offering online tutoring services.", industry: "EdTech" },
  { name: "Zerodha", logo: "https://logo.clearbit.com/zerodha.com", size: "1,001-5,000 employees", website: "https://zerodha.com", description: "Zerodha is an Indian financial services company offering retail and institutional broking and investment services.", industry: "Fintech" },
  { name: "Dream11", logo: "https://logo.clearbit.com/dream11.com", size: "501-1,000 employees", website: "https://dream11.com", description: "Dream11 is an Indian fantasy sports platform that allows users to play fantasy cricket, hockey, football, kabaddi, and basketball.", industry: "Gaming" },
  
  // Consulting & MNCs
  { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com", size: "10,001+ employees", website: "https://deloitte.com", description: "Deloitte is a multinational professional services network and the largest professional services network in the world.", industry: "Consulting" },
  { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com", size: "10,001+ employees", website: "https://accenture.com", description: "Accenture is a multinational professional services company specializing in IT services, consulting, and operations.", industry: "Consulting" },
  { name: "McKinsey", logo: "https://logo.clearbit.com/mckinsey.com", size: "10,001+ employees", website: "https://mckinsey.com", description: "McKinsey & Company is a global management consulting firm serving businesses, governments, and institutions.", industry: "Consulting" },
  { name: "PwC", logo: "https://logo.clearbit.com/pwc.com", size: "10,001+ employees", website: "https://pwc.com", description: "PricewaterhouseCoopers is a multinational professional services network of firms operating as partnerships under the PwC brand.", industry: "Consulting" },
  { name: "EY", logo: "https://logo.clearbit.com/ey.com", size: "10,001+ employees", website: "https://ey.com", description: "Ernst & Young is a multinational professional services partnership headquartered in London, England.", industry: "Consulting" },
  { name: "KPMG", logo: "https://logo.clearbit.com/kpmg.com", size: "10,001+ employees", website: "https://kpmg.com", description: "KPMG is a multinational professional services network and one of the Big Four accounting organizations.", industry: "Consulting" },
  
  // Banks & Finance
  { name: "HDFC Bank", logo: "https://logo.clearbit.com/hdfcbank.com", size: "10,001+ employees", website: "https://hdfcbank.com", description: "HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai.", industry: "Banking" },
  { name: "ICICI Bank", logo: "https://logo.clearbit.com/icicibank.com", size: "10,001+ employees", website: "https://icicibank.com", description: "ICICI Bank is an Indian multinational bank and financial services company headquartered in Mumbai.", industry: "Banking" },
  { name: "Axis Bank", logo: "https://logo.clearbit.com/axisbank.com", size: "10,001+ employees", website: "https://axisbank.com", description: "Axis Bank is an Indian banking and financial services company headquartered in Mumbai.", industry: "Banking" },
  { name: "Kotak Mahindra", logo: "https://logo.clearbit.com/kotak.com", size: "10,001+ employees", website: "https://kotak.com", description: "Kotak Mahindra Bank is an Indian banking and financial services company headquartered in Mumbai.", industry: "Banking" },
  { name: "Goldman Sachs", logo: "https://logo.clearbit.com/goldmansachs.com", size: "10,001+ employees", website: "https://goldmansachs.com", description: "Goldman Sachs is an American multinational investment bank and financial services company.", industry: "Investment Banking" },
  { name: "JP Morgan", logo: "https://logo.clearbit.com/jpmorgan.com", size: "10,001+ employees", website: "https://jpmorgan.com", description: "JPMorgan Chase & Co. is an American multinational investment bank and financial services holding company.", industry: "Investment Banking" },
  { name: "Morgan Stanley", logo: "https://logo.clearbit.com/morganstanley.com", size: "10,001+ employees", website: "https://morganstanley.com", description: "Morgan Stanley is an American multinational investment bank and financial services company.", industry: "Investment Banking" },
  
  // More Tech Companies
  { name: "Twitter", logo: "https://logo.clearbit.com/twitter.com", size: "1,001-5,000 employees", website: "https://twitter.com", description: "Twitter is an American social media company operating the microblogging and social networking service Twitter.", industry: "Social Media" },
  { name: "LinkedIn", logo: "https://logo.clearbit.com/linkedin.com", size: "10,001+ employees", website: "https://linkedin.com", description: "LinkedIn is a business and employment-focused social media platform owned by Microsoft.", industry: "Social Media" },
  { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com", size: "5,001-10,000 employees", website: "https://spotify.com", description: "Spotify is a Swedish audio streaming and media services provider founded in 2006.", industry: "Entertainment" },
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com", size: "5,001-10,000 employees", website: "https://stripe.com", description: "Stripe, Inc. is an American financial services and software company headquartered in San Francisco.", industry: "Fintech" },
  { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com", size: "5,001-10,000 employees", website: "https://shopify.com", description: "Shopify Inc. is a Canadian multinational e-commerce company headquartered in Ottawa, Ontario.", industry: "E-commerce" },
  { name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com", size: "5,001-10,000 employees", website: "https://atlassian.com", description: "Atlassian Corporation is an Australian software company that develops products for software developers and project managers.", industry: "Software" },
  { name: "Slack", logo: "https://logo.clearbit.com/slack.com", size: "1,001-5,000 employees", website: "https://slack.com", description: "Slack Technologies is an American software company known for its proprietary instant messaging platform Slack.", industry: "Software" },
  { name: "Zoom", logo: "https://logo.clearbit.com/zoom.us", size: "5,001-10,000 employees", website: "https://zoom.us", description: "Zoom Video Communications, Inc. is an American communications technology company headquartered in San Jose, California.", industry: "Software" },
  { name: "Dropbox", logo: "https://logo.clearbit.com/dropbox.com", size: "1,001-5,000 employees", website: "https://dropbox.com", description: "Dropbox, Inc. is an American file hosting service company that offers cloud storage, file synchronization, and personal cloud software.", industry: "Software" },
  { name: "Notion", logo: "https://logo.clearbit.com/notion.so", size: "501-1,000 employees", website: "https://notion.so", description: "Notion Labs, Inc. is an American software company that offers a freemium productivity and note-taking web application.", industry: "Software" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com", size: "501-1,000 employees", website: "https://figma.com", description: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.", industry: "Design" },
  { name: "Canva", logo: "https://logo.clearbit.com/canva.com", size: "1,001-5,000 employees", website: "https://canva.com", description: "Canva is an Australian graphic design platform that provides a variety of templates for creating graphics and documents.", industry: "Design" },
  { name: "GitHub", logo: "https://logo.clearbit.com/github.com", size: "1,001-5,000 employees", website: "https://github.com", description: "GitHub, Inc. is a platform and cloud-based service for software development and version control using Git.", industry: "Software" },
  { name: "GitLab", logo: "https://logo.clearbit.com/gitlab.com", size: "1,001-5,000 employees", website: "https://gitlab.com", description: "GitLab Inc. is an open-core company that provides GitLab, a DevOps software package that can develop, secure, and operate software.", industry: "Software" },
  { name: "MongoDB", logo: "https://logo.clearbit.com/mongodb.com", size: "1,001-5,000 employees", website: "https://mongodb.com", description: "MongoDB, Inc. is an American software company that develops and provides commercial support for the open source database MongoDB.", industry: "Database" },
  { name: "Snowflake", logo: "https://logo.clearbit.com/snowflake.com", size: "5,001-10,000 employees", website: "https://snowflake.com", description: "Snowflake Inc. is an American cloud computing-based data cloud company offering cloud-based data storage and analytics services.", industry: "Cloud" },
  { name: "Databricks", logo: "https://logo.clearbit.com/databricks.com", size: "1,001-5,000 employees", website: "https://databricks.com", description: "Databricks is a software company founded by the creators of Apache Spark, specializing in data engineering and data science.", industry: "Data" },
  { name: "Cloudflare", logo: "https://logo.clearbit.com/cloudflare.com", size: "1,001-5,000 employees", website: "https://cloudflare.com", description: "Cloudflare, Inc. is an American web-infrastructure and website-security company that provides CDN services and DDoS mitigation.", industry: "Cloud" },
  { name: "Twilio", logo: "https://logo.clearbit.com/twilio.com", size: "5,001-10,000 employees", website: "https://twilio.com", description: "Twilio Inc. is an American cloud communications platform as a service company based in San Francisco, California.", industry: "Cloud" },
  { name: "SendGrid", logo: "https://logo.clearbit.com/sendgrid.com", size: "501-1,000 employees", website: "https://sendgrid.com", description: "SendGrid is a cloud-based email delivery platform serving businesses of all sizes.", industry: "Cloud" },
  { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com", size: "501-1,000 employees", website: "https://vercel.com", description: "Vercel Inc. is a cloud platform company that provides the developer experience for frontend teams.", industry: "Cloud" },
  { name: "Netlify", logo: "https://logo.clearbit.com/netlify.com", size: "201-500 employees", website: "https://netlify.com", description: "Netlify is a San Francisco-based cloud computing company that offers hosting and serverless backend services for web applications.", industry: "Cloud" },
  { name: "Docker", logo: "https://logo.clearbit.com/docker.com", size: "501-1,000 employees", website: "https://docker.com", description: "Docker, Inc. is an American company that develops products for containerization, enabling developers to package applications.", industry: "DevOps" },
  { name: "HashiCorp", logo: "https://logo.clearbit.com/hashicorp.com", size: "1,001-5,000 employees", website: "https://hashicorp.com", description: "HashiCorp, Inc. is a software company that provides open-source tools and commercial products for infrastructure automation.", industry: "DevOps" },
  { name: "Elastic", logo: "https://logo.clearbit.com/elastic.co", size: "1,001-5,000 employees", website: "https://elastic.co", description: "Elastic NV is a search company that builds self-managed and SaaS offerings for search, logging, security, and analytics use cases.", industry: "Software" },
  { name: "Confluent", logo: "https://logo.clearbit.com/confluent.io", size: "1,001-5,000 employees", website: "https://confluent.io", description: "Confluent, Inc. is an American technology company founded by the creators of Apache Kafka.", industry: "Data" },
  { name: "DataDog", logo: "https://logo.clearbit.com/datadoghq.com", size: "1,001-5,000 employees", website: "https://datadoghq.com", description: "Datadog, Inc. is an American monitoring and security platform for cloud applications.", industry: "DevOps" },
  { name: "New Relic", logo: "https://logo.clearbit.com/newrelic.com", size: "1,001-5,000 employees", website: "https://newrelic.com", description: "New Relic, Inc. is an American web tracking and analytics company that provides performance management solutions.", industry: "DevOps" },
  { name: "Splunk", logo: "https://logo.clearbit.com/splunk.com", size: "5,001-10,000 employees", website: "https://splunk.com", description: "Splunk Inc. is an American software company that produces software for searching, monitoring, and analyzing machine-generated data.", industry: "Data" },
  { name: "Okta", logo: "https://logo.clearbit.com/okta.com", size: "5,001-10,000 employees", website: "https://okta.com", description: "Okta, Inc. is an American identity and access management company based in San Francisco.", industry: "Security" },
  { name: "CrowdStrike", logo: "https://logo.clearbit.com/crowdstrike.com", size: "5,001-10,000 employees", website: "https://crowdstrike.com", description: "CrowdStrike Holdings, Inc. is an American cybersecurity technology company based in Austin, Texas.", industry: "Security" },
  { name: "Palo Alto Networks", logo: "https://logo.clearbit.com/paloaltonetworks.com", size: "10,001+ employees", website: "https://paloaltonetworks.com", description: "Palo Alto Networks, Inc. is an American multinational cybersecurity company.", industry: "Security" },
  { name: "ServiceNow", logo: "https://logo.clearbit.com/servicenow.com", size: "10,001+ employees", website: "https://servicenow.com", description: "ServiceNow, Inc. is an American software company that develops a cloud computing platform to help companies manage digital workflows.", industry: "Software" },
  { name: "Workday", logo: "https://logo.clearbit.com/workday.com", size: "10,001+ employees", website: "https://workday.com", description: "Workday, Inc. is an American on-demand financial management and human capital management software vendor.", industry: "Software" },
  { name: "SAP", logo: "https://logo.clearbit.com/sap.com", size: "10,001+ employees", website: "https://sap.com", description: "SAP SE is a German multinational software company that develops enterprise software to manage business operations.", industry: "Software" },
  { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", size: "10,001+ employees", website: "https://oracle.com", description: "Oracle Corporation is an American multinational computer technology company headquartered in Austin, Texas.", industry: "Software" },
  { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", size: "10,001+ employees", website: "https://ibm.com", description: "International Business Machines Corporation is an American multinational technology company.", industry: "Technology" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com", size: "10,001+ employees", website: "https://intel.com", description: "Intel Corporation is an American multinational corporation and technology company.", industry: "Semiconductors" },
  { name: "NVIDIA", logo: "https://logo.clearbit.com/nvidia.com", size: "10,001+ employees", website: "https://nvidia.com", description: "Nvidia Corporation is an American multinational technology company known for designing graphics processing units.", industry: "Semiconductors" },
  { name: "AMD", logo: "https://logo.clearbit.com/amd.com", size: "10,001+ employees", website: "https://amd.com", description: "Advanced Micro Devices, Inc. is an American multinational semiconductor company.", industry: "Semiconductors" },
  { name: "Qualcomm", logo: "https://logo.clearbit.com/qualcomm.com", size: "10,001+ employees", website: "https://qualcomm.com", description: "Qualcomm Incorporated is an American multinational corporation that creates semiconductors, software, and services.", industry: "Semiconductors" },
  { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com", size: "10,001+ employees", website: "https://cisco.com", description: "Cisco Systems, Inc. is an American multinational technology conglomerate corporation.", industry: "Networking" },
  { name: "VMware", logo: "https://logo.clearbit.com/vmware.com", size: "10,001+ employees", website: "https://vmware.com", description: "VMware, Inc. is an American cloud computing and virtualization technology company.", industry: "Cloud" },
  { name: "Red Hat", logo: "https://logo.clearbit.com/redhat.com", size: "10,001+ employees", website: "https://redhat.com", description: "Red Hat, Inc. is an American multinational software company providing open-source software products.", industry: "Software" },
  { name: "Palantir", logo: "https://logo.clearbit.com/palantir.com", size: "1,001-5,000 employees", website: "https://palantir.com", description: "Palantir Technologies is an American software company that specializes in big data analytics.", industry: "Data" },
  { name: "Tableau", logo: "https://logo.clearbit.com/tableau.com", size: "5,001-10,000 employees", website: "https://tableau.com", description: "Tableau Software is an American interactive data visualization software company focused on business intelligence.", industry: "Data" },
  { name: "Asana", logo: "https://logo.clearbit.com/asana.com", size: "1,001-5,000 employees", website: "https://asana.com", description: "Asana, Inc. is an American software company that offers a web and mobile application designed to help teams organize work.", industry: "Software" },
  { name: "Monday.com", logo: "https://logo.clearbit.com/monday.com", size: "1,001-5,000 employees", website: "https://monday.com", description: "monday.com is an Israeli cloud-based platform that allows companies to create their own applications and project management software.", industry: "Software" },
  { name: "Airtable", logo: "https://logo.clearbit.com/airtable.com", size: "501-1,000 employees", website: "https://airtable.com", description: "Airtable is a cloud collaboration service that is a spreadsheet-database hybrid with the features of a database.", industry: "Software" },
  { name: "HubSpot", logo: "https://logo.clearbit.com/hubspot.com", size: "5,001-10,000 employees", website: "https://hubspot.com", description: "HubSpot, Inc. is an American developer and marketer of software products for inbound marketing, sales, and customer service.", industry: "Software" },
  { name: "Zendesk", logo: "https://logo.clearbit.com/zendesk.com", size: "5,001-10,000 employees", website: "https://zendesk.com", description: "Zendesk, Inc. is a Danish-American company that develops software-as-a-service products related to customer support and sales.", industry: "Software" },
  { name: "Freshworks", logo: "https://logo.clearbit.com/freshworks.com", size: "5,001-10,000 employees", website: "https://freshworks.com", description: "Freshworks Inc. is an Indian software company providing software-as-a-service products for customer engagement and employee experience.", industry: "Software" },
  { name: "Zoho", logo: "https://logo.clearbit.com/zoho.com", size: "5,001-10,000 employees", website: "https://zoho.com", description: "Zoho Corporation is an Indian multinational technology company that makes web-based business tools and information technology solutions.", industry: "Software" },
  
  // E-commerce & Retail
  { name: "Myntra", logo: "https://logo.clearbit.com/myntra.com", size: "1,001-5,000 employees", website: "https://myntra.com", description: "Myntra is an Indian e-commerce company headquartered in Bengaluru, India, specializing in fashion and lifestyle products.", industry: "E-commerce" },
  { name: "Meesho", logo: "https://logo.clearbit.com/meesho.com", size: "1,001-5,000 employees", website: "https://meesho.com", description: "Meesho is an Indian social commerce platform that enables small businesses and individuals to sell products via social media.", industry: "E-commerce" },
  { name: "Nykaa", logo: "https://logo.clearbit.com/nykaa.com", size: "1,001-5,000 employees", website: "https://nykaa.com", description: "Nykaa is an Indian e-commerce company selling beauty, wellness, and fashion products across its website and mobile app.", industry: "E-commerce" },
  { name: "BigBasket", logo: "https://logo.clearbit.com/bigbasket.com", size: "10,001+ employees", website: "https://bigbasket.com", description: "BigBasket is an Indian online grocery supermarket headquartered in Bangalore.", industry: "E-commerce" },
  { name: "Walmart", logo: "https://logo.clearbit.com/walmart.com", size: "10,001+ employees", website: "https://walmart.com", description: "Walmart Inc. is an American multinational retail corporation operating a chain of hypermarkets and grocery stores.", industry: "Retail" },
  { name: "Target", logo: "https://logo.clearbit.com/target.com", size: "10,001+ employees", website: "https://target.com", description: "Target Corporation is an American retail corporation operating a chain of department stores and discount stores.", industry: "Retail" },
  
  // Healthcare & Pharma
  { name: "Practo", logo: "https://logo.clearbit.com/practo.com", size: "1,001-5,000 employees", website: "https://practo.com", description: "Practo is an Indian healthcare technology company that offers healthcare services including doctor consultations and medicine delivery.", industry: "Healthcare" },
  { name: "1mg", logo: "https://logo.clearbit.com/1mg.com", size: "1,001-5,000 employees", website: "https://1mg.com", description: "1mg is an Indian healthcare platform offering online medicine delivery, doctor consultations, and lab tests.", industry: "Healthcare" },
  { name: "PharmEasy", logo: "https://logo.clearbit.com/pharmeasy.in", size: "5,001-10,000 employees", website: "https://pharmeasy.in", description: "PharmEasy is an Indian healthcare platform that provides online medicine delivery and diagnostic test services.", industry: "Healthcare" },
  { name: "Pfizer", logo: "https://logo.clearbit.com/pfizer.com", size: "10,001+ employees", website: "https://pfizer.com", description: "Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation.", industry: "Pharma" },
  { name: "Johnson & Johnson", logo: "https://logo.clearbit.com/jnj.com", size: "10,001+ employees", website: "https://jnj.com", description: "Johnson & Johnson is an American multinational corporation developing medical devices, pharmaceuticals, and consumer packaged goods.", industry: "Healthcare" },
  
  // Media & Entertainment
  { name: "Disney", logo: "https://logo.clearbit.com/disney.com", size: "10,001+ employees", website: "https://disney.com", description: "The Walt Disney Company is an American multinational entertainment and media conglomerate.", industry: "Entertainment" },
  { name: "Warner Bros", logo: "https://logo.clearbit.com/warnerbros.com", size: "10,001+ employees", website: "https://warnerbros.com", description: "Warner Bros. Entertainment Inc. is an American film and entertainment studio and division of Warner Bros. Discovery.", industry: "Entertainment" },
  { name: "Sony", logo: "https://logo.clearbit.com/sony.com", size: "10,001+ employees", website: "https://sony.com", description: "Sony Corporation is a Japanese multinational conglomerate corporation headquartered in Tokyo.", industry: "Electronics" },
  { name: "Hotstar", logo: "https://logo.clearbit.com/hotstar.com", size: "1,001-5,000 employees", website: "https://hotstar.com", description: "Disney+ Hotstar is an Indian subscription video on-demand over-the-top streaming service.", industry: "Entertainment" },
  
  // Travel & Hospitality
  { name: "MakeMyTrip", logo: "https://logo.clearbit.com/makemytrip.com", size: "1,001-5,000 employees", website: "https://makemytrip.com", description: "MakeMyTrip Limited is an Indian online travel company founded in 2000 and headquartered in Gurugram.", industry: "Travel" },
  { name: "OYO", logo: "https://logo.clearbit.com/oyorooms.com", size: "10,001+ employees", website: "https://oyorooms.com", description: "OYO Rooms is an Indian multinational hospitality chain of leased and franchised hotels, homes and living spaces.", industry: "Hospitality" },
  { name: "Booking.com", logo: "https://logo.clearbit.com/booking.com", size: "10,001+ employees", website: "https://booking.com", description: "Booking.com is a Dutch online travel agency for lodging reservations and other travel products.", industry: "Travel" },
  { name: "Expedia", logo: "https://logo.clearbit.com/expedia.com", size: "10,001+ employees", website: "https://expedia.com", description: "Expedia Group, Inc. is an American travel technology company that owns and operates travel fare aggregators and travel metasearch engines.", industry: "Travel" },
  
  // Telecom
  { name: "Jio", logo: "https://logo.clearbit.com/jio.com", size: "10,001+ employees", website: "https://jio.com", description: "Jio Platforms Limited is an Indian technology company and a subsidiary of Reliance Industries, headquartered in Mumbai.", industry: "Telecom" },
  { name: "Airtel", logo: "https://logo.clearbit.com/airtel.in", size: "10,001+ employees", website: "https://airtel.in", description: "Bharti Airtel Limited, also known as Airtel, is an Indian multinational telecommunications services company.", industry: "Telecom" },
  { name: "Vodafone Idea", logo: "https://logo.clearbit.com/myvi.in", size: "10,001+ employees", website: "https://myvi.in", description: "Vodafone Idea Limited is an Indian telecom operator with its headquarters based in Mumbai, Maharashtra.", industry: "Telecom" },
]

// Job titles by category
const jobTitles: Record<string, string[]> = {
  frontend: [
    "Frontend Developer", "Senior Frontend Developer", "Lead Frontend Developer", "Principal Frontend Engineer",
    "React Developer", "Senior React Developer", "Vue.js Developer", "Angular Developer",
    "UI Developer", "Senior UI Developer", "UI/UX Developer", "Frontend Architect",
    "JavaScript Developer", "TypeScript Developer", "Web Developer", "Frontend Engineer"
  ],
  backend: [
    "Backend Developer", "Senior Backend Developer", "Lead Backend Developer", "Principal Backend Engineer",
    "Node.js Developer", "Python Developer", "Java Developer", "Go Developer",
    "API Developer", "Microservices Developer", "Backend Engineer", "Server-Side Developer",
    ".NET Developer", "Ruby Developer", "PHP Developer", "Scala Developer"
  ],
  fullstack: [
    "Full Stack Developer", "Senior Full Stack Developer", "Lead Full Stack Developer", "Principal Full Stack Engineer",
    "MERN Stack Developer", "MEAN Stack Developer", "Full Stack Engineer", "Software Developer",
    "Web Application Developer", "Full Stack JavaScript Developer", "Full Stack Python Developer"
  ],
  mobile: [
    "Mobile Developer", "Senior Mobile Developer", "Lead Mobile Developer", "Mobile Architect",
    "iOS Developer", "Senior iOS Developer", "Android Developer", "Senior Android Developer",
    "React Native Developer", "Flutter Developer", "Swift Developer", "Kotlin Developer",
    "Mobile App Developer", "Cross-Platform Developer"
  ],
  devops: [
    "DevOps Engineer", "Senior DevOps Engineer", "Lead DevOps Engineer", "DevOps Architect",
    "Site Reliability Engineer", "Senior SRE", "Platform Engineer", "Infrastructure Engineer",
    "Cloud Engineer", "Senior Cloud Engineer", "AWS Engineer", "Azure Engineer",
    "Kubernetes Engineer", "CI/CD Engineer", "Release Engineer"
  ],
  data: [
    "Data Scientist", "Senior Data Scientist", "Lead Data Scientist", "Principal Data Scientist",
    "Data Analyst", "Senior Data Analyst", "Business Analyst", "Data Engineer",
    "Senior Data Engineer", "Lead Data Engineer", "Analytics Engineer", "BI Developer",
    "Data Architect", "Big Data Engineer", "ETL Developer"
  ],
  ai: [
    "Machine Learning Engineer", "Senior ML Engineer", "Lead ML Engineer", "Principal ML Engineer",
    "AI Engineer", "Senior AI Engineer", "AI Research Scientist", "Deep Learning Engineer",
    "NLP Engineer", "Computer Vision Engineer", "AI/ML Developer", "ML Ops Engineer",
    "Research Scientist", "Applied Scientist"
  ],
  security: [
    "Security Engineer", "Senior Security Engineer", "Lead Security Engineer", "Security Architect",
    "Cybersecurity Analyst", "Penetration Tester", "Security Consultant", "SOC Analyst",
    "Application Security Engineer", "Cloud Security Engineer", "Information Security Analyst",
    "Threat Intelligence Analyst", "Security Operations Engineer"
  ],
  hr: [
    "HR Manager", "Senior HR Manager", "HR Business Partner", "HR Director",
    "Talent Acquisition Specialist", "Recruiter", "Senior Recruiter", "Technical Recruiter",
    "HR Coordinator", "HR Executive", "People Operations Manager", "Employee Relations Specialist",
    "Compensation & Benefits Manager", "Learning & Development Manager", "HR Analyst"
  ],
  sales: [
    "Sales Manager", "Senior Sales Manager", "Sales Director", "Regional Sales Manager",
    "Account Executive", "Senior Account Executive", "Business Development Manager", "Sales Representative",
    "Inside Sales Representative", "Enterprise Sales Executive", "Sales Engineer", "Pre-Sales Consultant",
    "Customer Success Manager", "Key Account Manager"
  ],
  intern: [
    "Software Engineering Intern", "Frontend Development Intern", "Backend Development Intern",
    "Full Stack Development Intern", "Data Science Intern", "Machine Learning Intern",
    "DevOps Intern", "Mobile Development Intern", "UI/UX Design Intern", "QA Intern",
    "HR Intern", "Marketing Intern", "Business Development Intern", "Product Management Intern",
    "Web Development Intern", "Python Development Intern", "Java Development Intern",
    "Cloud Engineering Intern", "Cybersecurity Intern", "Research Intern", "Technical Writing Intern",
    "Graphic Design Intern", "Content Writing Intern", "Digital Marketing Intern", "Social Media Intern",
    "Operations Intern", "Finance Intern", "Legal Intern", "Customer Support Intern"
  ],
  unpaidIntern: [
    "Campus Ambassador", "Student Developer", "Open Source Contributor", "Community Intern",
    "Volunteer Web Developer", "Research Assistant", "Social Impact Intern", "NGO Tech Volunteer",
    "Startup Intern (Equity)", "Learning Intern", "Shadow Program Intern", "Mentorship Program Intern",
    "Academic Project Intern", "Virtual Intern", "Summer Research Fellow"
  ]
}

// Skills by category
const skillsByCategory: Record<string, string[][]> = {
  frontend: [
    ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    ["Vue.js", "JavaScript", "Nuxt.js", "Vuex", "CSS3"],
    ["Angular", "TypeScript", "RxJS", "NgRx", "SCSS"],
    ["React", "GraphQL", "Apollo", "Jest", "Cypress"],
    ["JavaScript", "HTML5", "CSS3", "Webpack", "Babel"]
  ],
  backend: [
    ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    ["Python", "Django", "PostgreSQL", "Celery", "AWS"],
    ["Java", "Spring Boot", "MySQL", "Kafka", "Kubernetes"],
    ["Go", "gRPC", "PostgreSQL", "Docker", "Kubernetes"],
    [".NET", "C#", "SQL Server", "Azure", "RabbitMQ"]
  ],
  fullstack: [
    ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    ["Vue.js", "Python", "PostgreSQL", "Django", "Docker"],
    ["Angular", "Java", "Spring Boot", "MySQL", "AWS"],
    ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Vercel"],
    ["React", "Python", "FastAPI", "PostgreSQL", "Docker"]
  ],
  mobile: [
    ["Swift", "iOS SDK", "Xcode", "Core Data", "SwiftUI"],
    ["Kotlin", "Android SDK", "Jetpack Compose", "Room", "Retrofit"],
    ["React Native", "JavaScript", "Redux", "Expo", "Firebase"],
    ["Flutter", "Dart", "Firebase", "Provider", "GetX"],
    ["Xamarin", "C#", ".NET MAUI", "SQLite", "Azure"]
  ],
  devops: [
    ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    ["Azure", "Docker", "AKS", "ARM Templates", "Azure DevOps"],
    ["GCP", "Docker", "GKE", "Cloud Build", "Terraform"],
    ["Linux", "Ansible", "Docker", "Jenkins", "Prometheus"],
    ["AWS", "Helm", "ArgoCD", "GitLab CI", "Datadog"]
  ],
  data: [
    ["Python", "SQL", "Pandas", "Tableau", "Power BI"],
    ["Python", "Spark", "Hadoop", "Airflow", "AWS"],
    ["R", "SQL", "Tableau", "Excel", "Looker"],
    ["Python", "dbt", "Snowflake", "Airflow", "Fivetran"],
    ["SQL", "Python", "BigQuery", "Looker", "Dataform"]
  ],
  ai: [
    ["Python", "TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
    ["Python", "NLP", "BERT", "Transformers", "spaCy"],
    ["Python", "Computer Vision", "OpenCV", "YOLO", "TensorFlow"],
    ["Python", "MLflow", "Kubeflow", "Docker", "Kubernetes"],
    ["Python", "LangChain", "OpenAI", "Vector DB", "RAG"]
  ],
  security: [
    ["Python", "SIEM", "Splunk", "Wireshark", "Nessus"],
    ["Penetration Testing", "Burp Suite", "Metasploit", "Kali Linux"],
    ["AWS Security", "IAM", "CloudTrail", "GuardDuty", "Security Hub"],
    ["Application Security", "OWASP", "SAST", "DAST", "SCA"],
    ["Network Security", "Firewalls", "IDS/IPS", "VPN", "Zero Trust"]
  ],
  hr: [
    ["Workday", "SAP SuccessFactors", "ADP", "HRIS", "Excel"],
    ["LinkedIn Recruiter", "ATS", "Sourcing", "Interviewing", "Onboarding"],
    ["Compensation Analysis", "Benefits Administration", "Payroll", "Compliance"],
    ["Employee Engagement", "Performance Management", "Learning & Development"],
    ["HR Analytics", "Tableau", "Power BI", "Python", "SQL"]
  ],
  sales: [
    ["Salesforce", "HubSpot", "Sales Navigator", "Cold Calling", "Negotiation"],
    ["B2B Sales", "Enterprise Sales", "Solution Selling", "Account Management"],
    ["CRM", "Lead Generation", "Pipeline Management", "Forecasting"],
    ["Presentation Skills", "Demo Skills", "Technical Sales", "Pre-Sales"],
    ["Customer Success", "Retention", "Upselling", "Cross-Selling"]
  ],
  intern: [
    ["Python", "JavaScript", "SQL", "Git", "Problem Solving"],
    ["React", "Node.js", "HTML/CSS", "Basic Algorithms"],
    ["Python", "Machine Learning", "Pandas", "NumPy", "Jupyter"],
    ["Communication", "Teamwork", "Eagerness to Learn", "Adaptability"],
    ["Java", "Spring Boot", "MySQL", "REST APIs", "Git"],
    ["Flutter", "Dart", "Firebase", "Mobile Development", "UI Design"]
  ],
  unpaidIntern: [
    ["HTML", "CSS", "JavaScript", "Basic Programming", "Willingness to Learn"],
    ["Communication", "Social Media", "Content Creation", "Research", "MS Office"],
    ["Python Basics", "Data Entry", "Excel", "Google Sheets", "Documentation"],
    ["Graphic Design", "Canva", "Adobe Basics", "Creativity", "Attention to Detail"]
  ]
}

// Locations
const locations = {
  india: [
    "Bengaluru, Karnataka, India",
    "Hyderabad, Telangana, India",
    "Mumbai, Maharashtra, India",
    "Pune, Maharashtra, India",
    "Chennai, Tamil Nadu, India",
    "Noida, Uttar Pradesh, India",
    "Gurugram, Haryana, India",
    "Kolkata, West Bengal, India",
    "Ahmedabad, Gujarat, India",
    "Kochi, Kerala, India",
    "Jaipur, Rajasthan, India",
    "Chandigarh, India",
    "Coimbatore, Tamil Nadu, India",
    "Indore, Madhya Pradesh, India",
    "Thiruvananthapuram, Kerala, India"
  ],
  us: [
    "San Francisco, CA, USA",
    "New York, NY, USA",
    "Seattle, WA, USA",
    "Austin, TX, USA",
    "Boston, MA, USA",
    "Los Angeles, CA, USA",
    "Chicago, IL, USA",
    "Denver, CO, USA",
    "Atlanta, GA, USA",
    "Miami, FL, USA",
    "San Jose, CA, USA",
    "Washington, DC, USA",
    "Portland, OR, USA",
    "Phoenix, AZ, USA",
    "Dallas, TX, USA"
  ],
  remote: ["Remote - India", "Remote - USA", "Remote - Worldwide", "Remote - APAC", "Remote - Americas"]
}

// Salary ranges
const salaryRanges = {
  india: {
    unpaidIntern: ["Unpaid - Certificate Provided", "Unpaid - Letter of Recommendation", "Unpaid - Learning Opportunity"],
    intern: ["₹15,000 - ₹25,000/month", "₹20,000 - ₹35,000/month", "₹10,000 - ₹20,000/month", "₹5,000 - ₹15,000/month", "₹8,000 - ₹18,000/month"],
    entry: ["₹4,00,000 - ₹8,00,000", "₹5,00,000 - ₹10,00,000", "₹6,00,000 - ₹12,00,000"],
    mid: ["₹10,00,000 - ₹18,00,000", "₹12,00,000 - ₹22,00,000", "₹15,00,000 - ₹25,00,000"],
    senior: ["₹20,00,000 - ₹35,00,000", "₹25,00,000 - ₹45,00,000", "₹30,00,000 - ₹50,00,000"],
    lead: ["₹35,00,000 - ₹55,00,000", "₹40,00,000 - ₹65,00,000", "₹50,00,000 - ₹80,00,000"]
  },
  us: {
    unpaidIntern: ["Unpaid - Certificate Provided", "Unpaid - Academic Credit", "Unpaid - Portfolio Building"],
    intern: ["$25 - $45/hour", "$30 - $50/hour", "$35 - $60/hour", "$20 - $35/hour"],
    entry: ["$70,000 - $100,000", "$80,000 - $120,000", "$90,000 - $130,000"],
    mid: ["$120,000 - $160,000", "$130,000 - $180,000", "$140,000 - $200,000"],
    senior: ["$160,000 - $220,000", "$180,000 - $250,000", "$200,000 - $280,000"],
    lead: ["$220,000 - $300,000", "$250,000 - $350,000", "$280,000 - $400,000"]
  }
}

// Function definitions for job responsibilities
const responsibilitiesTemplates: Record<string, string[]> = {
  frontend: [
    "Design and implement responsive user interfaces using modern frontend frameworks",
    "Collaborate with UX designers to translate wireframes into pixel-perfect implementations",
    "Optimize application performance and ensure cross-browser compatibility",
    "Write clean, maintainable, and well-documented code following best practices",
    "Participate in code reviews and provide constructive feedback to team members",
    "Implement state management solutions and integrate with RESTful/GraphQL APIs",
    "Develop and maintain component libraries and design systems",
    "Debug and resolve frontend issues reported by QA and end users"
  ],
  backend: [
    "Design and develop scalable backend services and APIs",
    "Implement database schemas and optimize query performance",
    "Build and maintain microservices architecture",
    "Ensure application security and implement authentication/authorization",
    "Write unit tests and integration tests for backend services",
    "Monitor application performance and implement improvements",
    "Collaborate with frontend developers on API design and integration",
    "Document APIs and technical specifications"
  ],
  fullstack: [
    "Develop end-to-end features across the full technology stack",
    "Design and implement both frontend interfaces and backend services",
    "Collaborate with product managers to define technical requirements",
    "Optimize application performance at all layers of the stack",
    "Participate in architectural decisions and technology selection",
    "Mentor junior developers and conduct code reviews",
    "Deploy and maintain applications in cloud environments",
    "Troubleshoot and debug issues across the entire application"
  ],
  mobile: [
    "Develop and maintain mobile applications for iOS and/or Android platforms",
    "Implement responsive UI designs that work across different screen sizes",
    "Integrate mobile applications with backend services and third-party APIs",
    "Optimize app performance, memory usage, and battery consumption",
    "Publish and maintain apps on App Store and/or Google Play Store",
    "Implement push notifications and offline functionality",
    "Write unit tests and UI tests for mobile applications",
    "Stay updated with latest mobile development trends and best practices"
  ],
  devops: [
    "Design and maintain CI/CD pipelines for automated deployments",
    "Manage and optimize cloud infrastructure using IaC tools",
    "Implement monitoring, logging, and alerting systems",
    "Ensure system security, reliability, and scalability",
    "Automate operational tasks and improve deployment efficiency",
    "Collaborate with development teams on infrastructure requirements",
    "Respond to incidents and perform root cause analysis",
    "Manage containerized applications using Kubernetes"
  ],
  data: [
    "Analyze large datasets to derive actionable business insights",
    "Build and maintain data pipelines and ETL processes",
    "Create dashboards and reports for stakeholders",
    "Develop statistical models and machine learning algorithms",
    "Collaborate with business teams to understand data requirements",
    "Ensure data quality and integrity across systems",
    "Document data models, processes, and findings",
    "Present insights and recommendations to leadership"
  ],
  ai: [
    "Design and implement machine learning models for production systems",
    "Research and experiment with state-of-the-art ML algorithms",
    "Build scalable ML pipelines for training and inference",
    "Collaborate with engineering teams to deploy models to production",
    "Analyze model performance and implement improvements",
    "Stay current with latest developments in AI/ML research",
    "Document ML experiments, findings, and best practices",
    "Mentor team members on ML techniques and methodologies"
  ],
  security: [
    "Conduct security assessments and vulnerability testing",
    "Implement security controls and monitoring systems",
    "Respond to security incidents and perform forensic analysis",
    "Develop security policies, procedures, and documentation",
    "Collaborate with development teams on secure coding practices",
    "Monitor threat intelligence and emerging security trends",
    "Perform penetration testing and security audits",
    "Ensure compliance with security standards and regulations"
  ],
  hr: [
    "Manage full-cycle recruitment process from sourcing to onboarding",
    "Develop and implement HR policies and procedures",
    "Handle employee relations issues and provide guidance",
    "Administer compensation and benefits programs",
    "Conduct performance management and development programs",
    "Ensure compliance with labor laws and regulations",
    "Analyze HR metrics and provide reports to leadership",
    "Support organizational development initiatives"
  ],
  sales: [
    "Identify and qualify potential customers through various channels",
    "Conduct product demonstrations and sales presentations",
    "Negotiate contracts and close deals with clients",
    "Build and maintain strong relationships with key accounts",
    "Achieve and exceed monthly/quarterly sales targets",
    "Collaborate with marketing team on lead generation campaigns",
    "Maintain accurate records in CRM system",
    "Provide market feedback and competitive intelligence"
  ],
  intern: [
    "Assist team members with development tasks and projects",
    "Learn and apply new technologies and development practices",
    "Participate in code reviews and team meetings",
    "Document processes and findings for future reference",
    "Collaborate with cross-functional teams on assigned projects",
    "Complete assigned training and learning modules"
  ]
}

// Qualifications templates
const qualificationsTemplates: Record<string, string[]> = {
  frontend: [
    "Strong proficiency in JavaScript/TypeScript and modern frontend frameworks",
    "Experience with state management libraries (Redux, MobX, Zustand)",
    "Familiarity with testing frameworks (Jest, Cypress, React Testing Library)",
    "Understanding of web performance optimization techniques",
    "Experience with CSS preprocessors and CSS-in-JS solutions",
    "Knowledge of build tools (Webpack, Vite, Rollup)",
    "Familiarity with version control systems (Git)",
    "Experience with CI/CD pipelines and deployment processes"
  ],
  backend: [
    "Strong proficiency in backend programming languages (Node.js, Python, Java, Go)",
    "Experience with relational and NoSQL databases",
    "Knowledge of RESTful API design and microservices architecture",
    "Familiarity with message queues and event-driven systems",
    "Understanding of containerization and orchestration tools",
    "Experience with cloud services (AWS, GCP, Azure)",
    "Knowledge of security best practices and authentication mechanisms",
    "Familiarity with monitoring and logging tools"
  ],
  fullstack: [
    "Proficiency in both frontend and backend technologies",
    "Experience building end-to-end web applications",
    "Knowledge of database design and optimization",
    "Familiarity with cloud deployment and DevOps practices",
    "Understanding of software architecture patterns",
    "Experience with agile development methodologies",
    "Strong problem-solving and debugging skills",
    "Excellent communication and collaboration abilities"
  ],
  mobile: [
    "Proficiency in native or cross-platform mobile development",
    "Experience publishing apps to App Store/Google Play",
    "Knowledge of mobile UI/UX best practices",
    "Understanding of mobile app architecture patterns",
    "Experience with mobile testing and debugging tools",
    "Familiarity with mobile analytics and crash reporting",
    "Knowledge of push notifications and deep linking",
    "Experience with CI/CD for mobile applications"
  ],
  devops: [
    "Strong experience with cloud platforms (AWS, GCP, Azure)",
    "Proficiency in Infrastructure as Code tools (Terraform, CloudFormation)",
    "Experience with containerization and Kubernetes",
    "Knowledge of CI/CD tools and practices",
    "Strong scripting skills (Bash, Python, PowerShell)",
    "Experience with monitoring and observability tools",
    "Understanding of networking and security principles",
    "Familiarity with GitOps and configuration management"
  ],
  data: [
    "Strong proficiency in Python, SQL, and data analysis tools",
    "Experience with data visualization tools (Tableau, Power BI, Looker)",
    "Knowledge of statistical analysis and machine learning basics",
    "Familiarity with big data technologies (Spark, Hadoop)",
    "Experience with ETL processes and data pipelines",
    "Understanding of data warehousing concepts",
    "Strong analytical and problem-solving skills",
    "Excellent communication and presentation abilities"
  ],
  ai: [
    "Strong proficiency in Python and ML frameworks (TensorFlow, PyTorch)",
    "Experience with deep learning and neural network architectures",
    "Knowledge of NLP, Computer Vision, or other ML specializations",
    "Familiarity with ML Ops and model deployment practices",
    "Experience with data preprocessing and feature engineering",
    "Understanding of statistical concepts and probability theory",
    "Published research or contributions to open-source ML projects is a plus",
    "Strong mathematical foundation in linear algebra and calculus"
  ],
  security: [
    "Strong knowledge of security principles and best practices",
    "Experience with security tools and vulnerability assessment",
    "Familiarity with compliance frameworks (SOC2, GDPR, HIPAA)",
    "Knowledge of network security and encryption protocols",
    "Experience with SIEM and security monitoring tools",
    "Understanding of application security and secure coding",
    "Relevant security certifications (CISSP, CEH, OSCP) preferred",
    "Experience with incident response and forensics"
  ],
  hr: [
    "Strong knowledge of HR practices and employment laws",
    "Experience with HRIS systems and HR analytics",
    "Excellent interpersonal and communication skills",
    "Ability to handle confidential information with discretion",
    "Experience with recruitment and talent acquisition",
    "Knowledge of compensation and benefits administration",
    "Strong organizational and time management skills",
    "HR certification (PHR, SHRM-CP) preferred"
  ],
  sales: [
    "Proven track record of meeting or exceeding sales targets",
    "Excellent communication and presentation skills",
    "Experience with CRM systems (Salesforce, HubSpot)",
    "Strong negotiation and closing skills",
    "Ability to build and maintain customer relationships",
    "Knowledge of sales methodologies and best practices",
    "Self-motivated with strong time management skills",
    "Experience in B2B or enterprise sales preferred"
  ],
  intern: [
    "Currently pursuing or recently completed relevant degree",
    "Strong academic performance and eagerness to learn",
    "Basic programming skills and understanding of fundamentals",
    "Good communication and teamwork abilities",
    "Ability to work independently and meet deadlines",
    "Enthusiasm for technology and industry trends"
  ]
}

// Education requirements
const educationRequirements: Record<string, string[]> = {
  technical: [
    "Bachelor's degree in Computer Science, Software Engineering, or related field",
    "Master's degree in Computer Science or related field preferred",
    "Relevant bootcamp or certification programs considered",
    "Equivalent practical experience may be considered"
  ],
  data: [
    "Bachelor's or Master's degree in Statistics, Mathematics, Computer Science, or related field",
    "PhD in quantitative field preferred for research roles",
    "Certifications in data analytics or machine learning are a plus"
  ],
  business: [
    "Bachelor's degree in Business Administration, Marketing, or related field",
    "MBA or relevant Master's degree preferred for senior roles",
    "Professional certifications in relevant domain"
  ],
  hr: [
    "Bachelor's degree in Human Resources, Business Administration, or related field",
    "HR certification (PHR, SHRM-CP, SHRM-SCP) preferred",
    "Master's degree in HR or Organizational Development is a plus"
  ],
  intern: [
    "Currently enrolled in Bachelor's or Master's program in relevant field",
    "Expected graduation within 1-2 years",
    "Minimum GPA of 3.0 or equivalent"
  ]
}

// Benefits
const benefitsTemplates = [
  "Competitive salary and performance bonuses",
  "Comprehensive health, dental, and vision insurance",
  "401(k) or Provident Fund with company matching",
  "Flexible working hours and remote work options",
  "Generous paid time off and holidays",
  "Professional development and learning opportunities",
  "Stock options or equity participation",
  "Wellness programs and gym membership",
  "Free meals or meal allowances",
  "Transportation allowance or company shuttle",
  "Parental leave and family support programs",
  "Employee assistance program",
  "Team outings and company events",
  "Latest tools and equipment provided"
]

// Generate time since posting
function generatePostedTime(): string {
  const times = [
    "Just now", "1 hour ago", "2 hours ago", "3 hours ago", "5 hours ago",
    "8 hours ago", "12 hours ago", "1 day ago", "2 days ago", "3 days ago",
    "4 days ago", "5 days ago", "1 week ago", "2 weeks ago"
  ]
  return times[Math.floor(Math.random() * times.length)]
}

// Generate applicant count
function generateApplicantCount(): number {
  const ranges = [
    [5, 25], [25, 50], [50, 100], [100, 200], [200, 500], [500, 1000]
  ]
  const range = ranges[Math.floor(Math.random() * ranges.length)]
  return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
}

// Generate a single job listing
function generateJob(id: number, category: string, region: "india" | "us" | "remote", isUnpaidIntern: boolean = false): JobListing {
  const company = companies[Math.floor(Math.random() * companies.length)]
  
  // Handle unpaid internships separately
  const actualCategory = isUnpaidIntern ? "unpaidIntern" : category
  const titles = isUnpaidIntern ? jobTitles.unpaidIntern : (jobTitles[category] || jobTitles.fullstack)
  const title = titles[Math.floor(Math.random() * titles.length)]
  const skillsOptions = isUnpaidIntern ? skillsByCategory.unpaidIntern : skillsByCategory[category]
  const skills = skillsOptions?.[Math.floor(Math.random() * (skillsOptions?.length || 1))] || ["JavaScript", "Python", "SQL"]
  
  // Determine experience level from title
  let experienceLevel: JobListing["experienceLevel"] = "Mid-Senior level"
  let salaryLevel: "unpaidIntern" | "intern" | "entry" | "mid" | "senior" | "lead" = "mid"
  let isPaid = true
  
  if (isUnpaidIntern) {
    experienceLevel = "Fresher/Student"
    salaryLevel = "unpaidIntern"
    isPaid = false
  } else if (title.includes("Intern")) {
    experienceLevel = "Entry level"
    salaryLevel = "intern"
  } else if (title.includes("Junior") || title.includes("Associate") || !title.includes("Senior") && !title.includes("Lead") && !title.includes("Principal")) {
    experienceLevel = "Associate"
    salaryLevel = "entry"
  } else if (title.includes("Senior")) {
    experienceLevel = "Mid-Senior level"
    salaryLevel = "senior"
  } else if (title.includes("Lead") || title.includes("Principal") || title.includes("Director")) {
    experienceLevel = "Director"
    salaryLevel = "lead"
  }
  
  // Get location
  let location: string
  let locationType: JobListing["locationType"] = "Hybrid"
  
  if (region === "remote") {
    location = locations.remote[Math.floor(Math.random() * locations.remote.length)]
    locationType = "Remote"
  } else if (region === "india") {
    location = locations.india[Math.floor(Math.random() * locations.india.length)]
    locationType = Math.random() > 0.3 ? "Hybrid" : "On-site"
  } else {
    location = locations.us[Math.floor(Math.random() * locations.us.length)]
    locationType = Math.random() > 0.4 ? "Hybrid" : "Remote"
  }
  
  // Get salary
  const salaryRegion = region === "us" ? "us" : "india"
  const salaryOptions = salaryRanges[salaryRegion][salaryLevel]
  const salary = salaryOptions[Math.floor(Math.random() * salaryOptions.length)]
  
  // Get responsibilities and qualifications
  const respCategory = isUnpaidIntern ? "intern" : category
  const responsibilities = responsibilitiesTemplates[respCategory] || responsibilitiesTemplates.fullstack
  const qualifications = qualificationsTemplates[respCategory] || qualificationsTemplates.fullstack
  
  // Get education
  let education = educationRequirements.technical
  if (category === "data" || category === "ai") education = educationRequirements.data
  else if (category === "hr") education = educationRequirements.hr
  else if (category === "sales") education = educationRequirements.business
  else if (category === "intern" || isUnpaidIntern) education = educationRequirements.intern
  
  // Employment type
  let employmentType: JobListing["employmentType"] = "Full-time"
  if (isUnpaidIntern) employmentType = "Unpaid Internship"
  else if (category === "intern") employmentType = "Internship"
  else if (Math.random() < 0.1) employmentType = "Contract"
  
  // Function mapping
  const functionMap: Record<string, string> = {
    frontend: "Engineering - Frontend",
    backend: "Engineering - Backend",
    fullstack: "Engineering - Full Stack",
    mobile: "Engineering - Mobile",
    devops: "Engineering - DevOps/SRE",
    data: "Data Science & Analytics",
    ai: "Artificial Intelligence & Machine Learning",
    security: "Information Security",
    hr: "Human Resources",
    sales: "Sales & Business Development",
    intern: "Internship Program",
    unpaidIntern: "Internship Program - Beginners"
  }
  
  // Benefits for unpaid internships
  const internBenefits = [
    "Certificate of completion",
    "Letter of recommendation",
    "Hands-on project experience",
    "Mentorship from industry experts",
    "Portfolio building opportunity",
    "Networking opportunities",
    "Flexible working hours",
    "Remote work option"
  ]
  
  return {
    id,
    title,
    company: company.name,
    companyLogo: company.logo,
    companyDescription: company.description,
    location,
    locationType,
    employmentType,
    experienceLevel,
    isPaid,
    stipend: isUnpaidIntern ? undefined : (category === "intern" ? salary : undefined),
    function: functionMap[isUnpaidIntern ? "unpaidIntern" : category] || "Engineering",
    industry: company.industry,
    salary,
    posted: generatePostedTime(),
    applicants: generateApplicantCount(),
    category: isUnpaidIntern ? "intern" : category,
    skills,
    aboutJob: isUnpaidIntern 
      ? `${company.name} is offering an exciting unpaid internship opportunity for students and freshers looking to kickstart their career. This is a great chance to gain real-world experience, build your portfolio, and learn from industry professionals.`
      : `We are looking for a talented ${title} to join our ${company.name} team. This is an exciting opportunity to work on cutting-edge technology and make a significant impact on our products and services.`,
    positionOverview: isUnpaidIntern
      ? `As a ${title} at ${company.name}, you will get hands-on experience working on real projects. This internship is designed for beginners who want to learn and grow. No prior experience required - just enthusiasm and willingness to learn!`
      : `As a ${title} at ${company.name}, you will be responsible for ${category === "frontend" ? "building and maintaining user-facing applications" : category === "backend" ? "developing scalable backend services and APIs" : category === "ai" ? "designing and implementing machine learning solutions" : "delivering high-quality solutions"}. You will collaborate with cross-functional teams to deliver exceptional results and contribute to our company's growth.`,
    keyResponsibilities: responsibilities.slice(0, 5 + Math.floor(Math.random() * 3)),
    preferredQualifications: isUnpaidIntern 
      ? ["Currently enrolled in college/university", "Basic understanding of relevant concepts", "Strong communication skills", "Eagerness to learn", "Ability to commit 20-40 hours per week"]
      : qualifications.slice(0, 5 + Math.floor(Math.random() * 3)),
    educationalRequirements: education.slice(0, 2 + Math.floor(Math.random() * 2)),
    toolsAndTechnologies: skills,
    benefits: isUnpaidIntern ? internBenefits : benefitsTemplates.slice(0, 6 + Math.floor(Math.random() * 4)),
    companySize: company.size,
    companyWebsite: company.website,
    applyUrl: `${company.website}/careers`
  }
}

// Generate jobs database with internship quota for beginners
export function generateJobsDatabase(count: number = 1000): JobListing[] {
  const jobs: JobListing[] = []
  const categories = Object.keys(jobTitles).filter(c => c !== "unpaidIntern") // Exclude unpaidIntern from regular rotation
  
  // Calculate internship quota (15% of total jobs will be internships, 5% unpaid)
  const paidInternshipQuota = Math.floor(count * 0.10) // 10% paid internships
  const unpaidInternshipQuota = Math.floor(count * 0.05) // 5% unpaid internships
  const regularJobsCount = count - paidInternshipQuota - unpaidInternshipQuota
  
  let jobId = 1
  
  // Generate regular jobs
  for (let i = 0; i < regularJobsCount; i++) {
    const category = categories.filter(c => c !== "intern")[Math.floor(Math.random() * (categories.length - 1))]
    // More jobs from India
    const regionWeights = [0.6, 0.3, 0.1] // 60% India, 30% US, 10% Remote
    const rand = Math.random()
    let region: "india" | "us" | "remote" = "india"
    if (rand > regionWeights[0]) region = "us"
    if (rand > regionWeights[0] + regionWeights[1]) region = "remote"
    
    jobs.push(generateJob(jobId++, category, region, false))
  }
  
  // Generate paid internships (beginner friendly)
  for (let i = 0; i < paidInternshipQuota; i++) {
    const rand = Math.random()
    let region: "india" | "us" | "remote" = "india"
    if (rand > 0.7) region = "us" // 70% India, 20% US, 10% Remote
    if (rand > 0.9) region = "remote"
    
    jobs.push(generateJob(jobId++, "intern", region, false))
  }
  
  // Generate unpaid internships (for absolute beginners)
  for (let i = 0; i < unpaidInternshipQuota; i++) {
    const rand = Math.random()
    let region: "india" | "us" | "remote" = "india"
    if (rand > 0.8) region = "remote" // 80% India, 20% Remote (most unpaid internships are in India)
    
    jobs.push(generateJob(jobId++, "intern", region, true))
  }
  
  // Shuffle jobs array to mix internships with regular jobs
  for (let i = jobs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [jobs[i], jobs[j]] = [jobs[j], jobs[i]]
  }
  
  return jobs
}

// Pre-generate a large batch of jobs (30,000 total)
export const jobsDatabase = generateJobsDatabase(30000)
