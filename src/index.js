import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/users'));
app.model(require('./models/pageIndex'));
app.model(require('./models/userGroup'));
app.model(require('./models/role'));
app.model(require('./models/privilege'));
app.model(require('./models/menu'));
app.model(require('./models/system'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
