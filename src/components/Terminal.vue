<template>
    <div class="js-terminal" :theme="theme" @click="$refs['input'].focus()">
        <div class="terminal-container">
            <div class="terminal-body">
                <div class="entry" :class="{'error': log.error}" v-for="(log, logIndex) in logs" :key="logIndex">
                    {{ log.output ? " => " : "" }}{{ log.content }}
                </div>
            </div>
            <div class="terminal-entry">
                <div class="prefix">user@js-terminal></div>
                <input v-model="command" ref="input" class="entry" contenteditable="true" @keyup.enter="execute(command)" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JSTerminal",
        data() {
            return {
                theme: 'hacker',
                command: '',
                logs: [],
                logAction: null,
                errorAction: null,
                eval: this.execScript || eval
            }
        },
        methods: {
            log(args, output = false, error = false) {
                this.logs.push({content: args, output, error});
            },
            execute(command) {
                this.log(command);
                let output;
                let error;
                try {
                    output = this.eval(command);
                } catch(e) {
                    output = e;
                    error = true;
                }
                if(output) this.log(output, true, error);
                this.command = '';
            }
        },
        mounted() {
            this.logAction = console.log;
            this.errorAction = console.error;

            console.log = (...args) => {
                this.log(...args, true);
                this.$nextTick(() => {
                    this.logAction(...args);
                });
            };

            console.error = (...args) => {
                this.log(...args, true, true);
                this.$nextTick(() => {
                    this.errorAction(...args);
                });
            };
        }
    }
</script>

<style scoped>
    .js-terminal {
        display: flex;
        position: relative;
        min-width: 100%;
        min-height: 100%;
        padding: 8px;
    }

    .js-terminal[theme="hacker"] {
        background-color: #0c1d12;
        color: #00b600;
        font-family: monospace;
        border: 1px #00b600 solid;
        animation: textShadow 1.033s infinite, glitch-skew 0.6s;
    }
    .js-terminal[theme="hacker"]:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        width: auto;
        min-width: 100%;
        height: 100%;
        z-index: 5;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
        background-size: 100% 2px, 3px 100%;
    }
    .js-terminal[theme="hacker"]:before {
        content: '';
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: auto;
        min-width: 100%;
        height: 2px;
        z-index: 10;
        background: rgba(0, 0, 0, .3);
        opacity: 0.75;
        animation: scanline 7.77s linear infinite;
    }

    @keyframes textShadow {
        0% {
            text-shadow: 0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        5% {
            text-shadow: 2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        10% {
            text-shadow: 0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        15% {
            text-shadow: 0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        20% {
            text-shadow: 3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        25% {
            text-shadow: 1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        30% {
            text-shadow: 0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        35% {
            text-shadow: 3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        40% {
            text-shadow: 3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        45% {
            text-shadow: 2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        50% {
            text-shadow: 0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        55% {
            text-shadow: 2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        60% {
            text-shadow: 2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        65% {
            text-shadow: 2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        70% {
            text-shadow: 0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        75% {
            text-shadow: 1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        80% {
            text-shadow: 0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        85% {
            text-shadow: 0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        90% {
            text-shadow: 3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        95% {
            text-shadow: 2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
        100% {
            text-shadow: 2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px;
        }
    }
    @keyframes scanline {
        0% {
            top:99%;
        }
    }
    @keyframes scanlines {
        0% {
            background-position: 0 50%;
        }
    }
    @keyframes glitch-skew {
        0% {
            transform: skew(-20deg, 10deg);
            filter: blur(6px);
        }
        32% {
            transform: skew(20deg, 0deg);
        }
        54% {
            transform: skew(0deg, 0deg);
            filter: blur(0);
        }
        100% {
            transform: skew(0deg, 0deg);
        }
    }

    .terminal-container {
        display: flex;
        position: relative;
        flex-direction: column;
        flex-grow: 1;
        align-items: flex-start;
        width: 100%;
        height: 100%;
    }
    .terminal-container > .terminal-body {
        display: flex;
        position: relative;
        justify-self: flex-start;
        flex-direction: column;
        flex-grow: 1;
    }
    .terminal-container > .terminal-body > .entry.error {
        color: #ff3333;
    }
    .terminal-container > .terminal-entry {
        display: flex;
        position: relative;
        justify-self: flex-end;
        width: 100%;
    }
    .terminal-container > .terminal-entry > .prefix, .terminal-container > .terminal-entry > .entry {
        display: flex;
        position: relative;
    }
    .terminal-container > .terminal-entry > .prefix {
        flex-shrink: 1;
    }
    .terminal-container > .terminal-entry > .entry {
        flex-grow: 1;
        background-color: transparent;
        font-family: inherit;
        outline: none;
        border: none;
        color: inherit;
    }
    .terminal-container > .terminal-entry > .entry:after {
        content: '';
        position: absolute;
        background-color: inherit;
        width: 5px;
        height: 100%;
    }
</style>