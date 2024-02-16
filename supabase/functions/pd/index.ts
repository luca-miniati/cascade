import * as dfd from 'npm:danfojs-node';
import * as tf from 'npm:@tensorflow/tfjs';

const df = await dfd.readCSV('../backtest/data/clean/2017_2018.csv');

const le = new dfd.LabelEncoder()
df['loan_status_description'] = le.fitTransform(df['loan_status_description']);
df['prosper_rating'] = le.fitTransform(df['prosper_rating']);

let features = df.loc({ columns: ['amount_borrowed', 'borrower_rate', 'prosper_rating', 'term'] });
let target = df.loc({ columns: ['loan_status_description'] });

const scaler = new dfd.MinMaxScaler();
features = scaler.fitTransform(features).tensor;
target = target.tensor;

const model = tf.sequential();
model.add(tf.layers.dense(
    { inputShape: [4], units: 124, activation: 'relu', kernelInitializer: 'leCunNormal' }
));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }))

model.compile({
    optimizer: "rmsprop",
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
});

console.log("Training started...")
await model.fit(features, target,{
    batchSize: 32,
    epochs: 10,
    validationSplit: 0.2,
    callbacks:{
        onEpochEnd: async (epoch, logs) => {
            console.log(`EPOCH (${epoch + 1}): Train Accuracy: ${(logs.acc * 100).toFixed(2)},
                                                 Val Accuracy:  ${(logs.val_acc * 100).toFixed(2)}\n`);
        }
    },
});

console.log("Predictions:");
model.predict(
    tf.reshape(
        tf.gather(features, tf.tensor1d([0], 'int32')),
        [1, 4]
    )
).print();
model.predict(
    tf.reshape(
        tf.gather(features, tf.tensor1d([1], 'int32')),
        [1, 4]
    )
).print();
model.predict(
    tf.reshape(
        tf.gather(features, tf.tensor1d([2], 'int32')),
        [1, 4]
    )
).print();
